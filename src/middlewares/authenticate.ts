import { Handler } from 'express'

import authenticationService from '../services/authentication'

import Unauthorized from '../errors/Unauthorized'

const authenticate: Handler = async (req, res, next) => {
  const token = req.get('Authorization')

  const decoded = authenticationService.verify(token)

  if (!decoded) {
    const error = new Unauthorized('unauthorized-authentication', 'Unauthorized Access')
    return next(error)
  }

  res.locals.authenticated = decoded

  next()
}

export default authenticate
