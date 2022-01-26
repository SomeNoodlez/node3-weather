const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const public = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(public))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'javi',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'javi',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is a completely useless message under help',
    name: 'javi',
  })
})

app.get('/weather', (req, res) => {
  const {
    query: { address },
  } = req

  if (!address) {
    return res.send({
      error: 'You must provide an address',
    })
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    })
  }
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'javi',
    errorMessage: 'Help article not found.',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'javi',
    errorMessage: 'Page not found.',
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
