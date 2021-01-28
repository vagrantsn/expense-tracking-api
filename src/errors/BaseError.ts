interface errorResponse {
  responseCode: number,
  body: {
    name: string,
    message: string,
    fields?: string[],
  }
}

class BaseError {
  name = ''
  message = ''
  responseCode = 0

  constructor (name, message, responseCode) {
    this.name = name
    this.message = message
    this.responseCode = responseCode
  }

  toJson (): errorResponse {
    const { responseCode, message, name } = this

    return {
      responseCode,
      body: {
        name: name,
        message,
      }
    }
  }
}

export default BaseError
