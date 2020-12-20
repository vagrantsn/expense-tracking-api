const BaseError = require('./BaseError')

class Unauthorized extends BaseError {
  constructor (name, message) {
    super(name, message, 401)
  }
}

module.exports = Unauthorized
