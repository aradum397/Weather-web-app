const express = require('express')
const app = express()

const path = require('path')
const ejsMate = require('ejs-mate')

const geocode = require('./public/js/geocode')
const forecast = require('./public/js/forecast')

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));

app.get('', (req, res) => {
	res.render('')
})

app.post('', (req, res) => {
	const { location } = req.body
	const weather = geocode(location, (geodata) => {
		if (geodata.error) {
			return res.render('error', { error: geodata.error })
		} else {
			const latitude = geodata[0]
			const longitude = geodata[1]
			forecast(latitude, longitude, (weather) => {
				if (weather.error) {
					return res.render('error', { error: weather.error })
				} else {
					return res.render('show', { weather })
				}
			})
		}
	})
})

app.get('*', (req, res) => {
	res.render('error', { error: "Ah, beans!"})
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Now listening on port ${port}!`);
})