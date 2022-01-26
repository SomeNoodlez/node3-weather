const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bac7e5a26e3cdca2f517c9e45cf0ec4f&query=${latitude},${longitude}&units=f`

  request.get({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service!')
    } else if (body.error) {
      callback(body.error)
    } else {
      const { current } = body
      callback(
        undefined,
        `${current.weather_descriptions[0]}. It is currently ${current.temperature}. It feels like ${current.feelslike} degrees out.`
      )
    }
  })
}

module.exports = forecast
