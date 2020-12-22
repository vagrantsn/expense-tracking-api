const authenticationService = require('../services/authentication')

const Unauthorized = require('../errors/Unauthorized')

const authenticate = async (req, res, next) => {
  const token = req.get('Authorization')

  const decoded = authenticationService.verify(token)

  if (!decoded) {
    throw new Unauthorized('unauthorized-authentication', 'Access unauthorized')
  }

  res.locals.authenticated = decoded

  next()
}

module.exports = authenticate
