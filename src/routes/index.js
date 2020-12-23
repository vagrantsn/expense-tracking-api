const express = require('express')

const users = require('./users')
const sessions = require('./sessions')
const operations = require('./operations')

const errorHandler = require('../middlewares/error-handler')

const routes = express.Router()

routes.use(users)
routes.use(sessions)
routes.use(operations)

routes.use(errorHandler)

routes.use((error, req, res, next) => {
  console.error(error)

  res.status(500).json({
    error: 'internal-error',
    message: 'An internal error ocurred'
  })
})

routes.get('/status', (req, res) => res.json({
  health: 'good',
  date: new Date(),
}))

routes.get('*', (req, res) => res.status(404).json({
  error: 'route-not-found',
  message: 'Route not found',
}))

module.exports = routes
