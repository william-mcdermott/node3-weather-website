const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiMTY0Z3RmIiwiYSI6ImNqdDh3NWRpMzAwOTU0NHBiZzIxdTcyMzYifQ._3hIMJpQ2EzSGIhuHqbdKQ`
  request({ url, json: true }, (error, { body }) => {
    const { features } = body
    if (error) {
      callback('Unable to connect to location services.')
    } else if (!features.length) {
      callback('Unable to find location. Try another search.')
    } else {
      const { 1:latitude, 0:longitude } = features[0].center
      callback(undefined, {
        latitude,
        longitude,
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode
