const request = require('postman-request')
const token = process.env.MAPBOX_TOKEN

const geocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=-74.70850,40.78375&access_token=${token}&limit=1`
	request({ url, json: true }, (err, res) => {
		if (err) {
			return callback({
				error: 'Unable to retreive geodata!'
			})
		}
		if (res.body.features.length === 0) {
			return callback({
				error: 'Please provide a valid location!'
			})
		}
		else {
			return callback(res.body.features[0].center)
		}
	})
}

module.exports = geocode