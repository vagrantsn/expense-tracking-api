const authenticationService = require('../services/authentication')

const Unauthorized = require('../errors/Unauthorized')

const authenticate = async (req, res, next) => {
  const token = req.get('Authorization')

  const isValidToken = authenticationService.verify(token)

  if (!isValidToken) {
    throw new Unauthorized('unauthorized-authentication', 'Access unauthorized')
  }

  next()
}

module.exports = authenticate
