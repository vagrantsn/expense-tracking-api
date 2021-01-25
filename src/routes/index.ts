import express, { ErrorRequestHandler } from 'express'

import users from './users'
import sessions from './sessions'
import operations from './operations'

import errorHandler from '../middlewares/error-handler'

const routes = express.Router()

routes.use(users)
routes.use(sessions)
routes.use(operations)

routes.use(errorHandler)

const internalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error)

  res.status(500).json({
    error: 'internal-error',
    message: 'An internal error ocurred'
  })
}

routes.use(internalErrorHandler)

routes.get('/status', (req, res) => res.json({
  health: 'good',
  date: new Date(),
}))

routes.get('*', (req, res) => res.status(404).json({
  error: 'route-not-found',
  message: 'Route not found',
}))

export default routes
