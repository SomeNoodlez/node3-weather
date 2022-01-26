const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const baseURL = 'http://localhost:3000/weather'
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`${baseURL}?address=${location}`).then((response) => {
    response.json().then((data) => {
      const { error, location, forecast } = data
      if (error) {
        messageOne.textContent = error
      } else {
        messageOne.textContent = location
        messageTwo.textContent = forecast
      }
    })
  })
})
