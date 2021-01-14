class BaseError {
  constructor (name, message, responseCode) {
    this.name = name
    this.message = message
    this.responseCode = responseCode
  }

  toJson () {
    const { responseCode, message, name } = this

    return {
      responseCode,
      body: {
        error: name,
        message,
      }
    }
  }
}

export default BaseError
