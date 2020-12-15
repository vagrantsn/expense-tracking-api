const express = require('express')

const users = require('./users')
const errorHandler = require('../middlewares/error-handler')

const routes = express.Router()

routes.use(users)

routes.use(errorHandler)

routes.get('/status', (req, res) => res.json({
  health: 'good',
  date: new Date(),
}))

routes.get('*', (req, res) => res.status(404).json({
  error: 'route-not-found',
  message: 'Route not found',
}))

module.exports = routes
