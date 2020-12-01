class BaseError {
  constructor (name, message, responseCode) {
    this.name = name
    this.message = message
    this.responseCode = responseCode
  }
}

module.exports = BaseError
