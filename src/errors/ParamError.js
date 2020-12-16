const BadRequest = require('./BadRequest')

class ParamError extends BadRequest {
  constructor (errors) {
    super('param-error', 'There is one or more invalid parameters')

    this.errors = errors
  }

  toJson () {
    const json = super.toJson()

    json.body.errors = this.errors

    return json
  }
}

module.exports = ParamError
