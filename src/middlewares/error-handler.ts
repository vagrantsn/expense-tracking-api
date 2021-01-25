import { ErrorRequestHandler } from 'express'

import BaseError from '../errors/BaseError'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const extendsBaseError = err instanceof BaseError
  if (!extendsBaseError) return next(err)

  const { responseCode, body } = err.toJson()

  return res.status(responseCode).json(body)
}

export default errorHandler
