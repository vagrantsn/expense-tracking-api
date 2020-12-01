const BaseError = require('./BaseError')

class BadRequest extends BaseError {
  constructor (name, message) {
    super(name, message, 400)
  }
}

module.exports = BadRequest
