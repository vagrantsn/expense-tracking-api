import BaseError from './BaseError'

class BadRequest extends BaseError {
  constructor (name, message) {
    super(name, message, 400)
  }
}

export default BadRequest
