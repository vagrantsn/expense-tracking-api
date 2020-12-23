const authenticationService = require('../services/authentication')

const Unauthorized = require('../errors/Unauthorized')

const authenticate = async (req, res, next) => {
  const token = req.get('Authorization')

  const decoded = authenticationService.verify(token)

  if (!decoded) {
    const error = new Unauthorized('unauthorized-authentication', 'Unauthorized Access')
    return next(error)
  }

  res.locals.authenticated = decoded

  next()
}

module.exports = authenticate
