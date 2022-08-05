const request = require('postman-request')
const key = process.env.WEATHERSTACK_KEY

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${key}&query=${longitude},${latitude}`
	request({ url, json: true }, (err, res) => {
		if (err) {
			return callback({
				error: 'Unable to retreive weather data!'
			})
		}
		if (res.body.error) {
			return callback({
				error: res.body.error.info
			})
		}
		else {
			return callback(res.body)
		}
	})
}

module.exports = forecast