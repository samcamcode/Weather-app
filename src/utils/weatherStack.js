const request = require('request');

const weatherAddress = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b12228bffb88712c2d698ea21907c2ce&query=${address}&units=f`;

request({url, json: true}, (error, response) => {

    if (error) {
        callback('can not connect', undefined)
    }else if (response.body.error) {
        callback('cant find location', undefined)
    }else {
        callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out and feels like ${response.body.current.feelslike} degrees.`)
    }
})
}

module.exports = weatherAddress
