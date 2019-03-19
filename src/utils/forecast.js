const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/70bea74749011e5d1684d23fd8175795/${lat},${long}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      const { daily, currently } = body
      callback(undefined, `${daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`);
    }
  })
}

module.exports = forecast
