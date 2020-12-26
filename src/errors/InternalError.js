const BaseError = require('./BaseError')

class InternalError extends BaseError {
  constructor () {
    super('internal-error', 'There was an internal error', 500)
  }
}

module.exports = InternalError
