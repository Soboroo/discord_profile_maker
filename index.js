const { Client } = require('discord.js')
const express = require('express')
const expressHandlebars = require("express-handlebars")
require('dotenv').config()

const token = process.env.DISCORD_TOKEN
const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars')

const client = new Client({ intents: [] })
client.token = token

app.get('/', (req, res) => {
	if (req.query.id) {
		client.users.fetch(req.query.id).then((user) => {
			res.json(JSON.stringify(user));
		})
	} else {
		res.send('No id provided');
	}
})

app.get('/profile', (req, res) => {
	//res.sendFile(__dirname + '/src/profile.html')
	if (req.query.id) {
		client.users.fetch(req.query.id).then((user) => {
			res.render('profile',
				{
					layout: null,
					username: user.username,
					discriminator: user.discriminator,
					avatar: user.displayAvatarURL(),
				}, (err, html) => {
					if (err) {
						console.log(err);
					} else {
						res.setHeader('Content-Type', 'image/svg+xml');
						res.send(html);
					}
				})
		})
	} else {
		res.send('No id provided');
	}
});

app.get('/ginto.woff', (req, res) => {
	res.sendFile(__dirname + '/src/ginto.woff')
})

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})