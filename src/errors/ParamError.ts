import BadRequest from './BadRequest'

class ParamError extends BadRequest {
  fields = []

  constructor (fields) {
    super('param-error', 'There is one or more invalid parameters')

    this.fields = fields
  }

  toJson () {
    const json = super.toJson()

    json.body = {
      ...json.body,
      fields: this.fields,
    }

    return json
  }
}

export default ParamError
