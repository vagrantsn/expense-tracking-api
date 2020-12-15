require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes/index.js')

const app = express()
app.use(bodyParser.json())

app.use(routes)

module.exports = app
