import BaseError from './BaseError'

class Unauthorized extends BaseError {
  constructor (name, message) {
    super(name, message, 401)
  }
}

export default Unauthorized
