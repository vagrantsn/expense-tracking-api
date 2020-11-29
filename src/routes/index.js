import express from 'express'

const routes = express.Router()

routes.get('/status', (req, res) => res.json({
  health: 'good',
  date: new Date(),
}))

routes.get('*', (req, res) => res.status(404).json({
  error: 'route-not-found',
  message: 'Route not found',
}))

export default routes
