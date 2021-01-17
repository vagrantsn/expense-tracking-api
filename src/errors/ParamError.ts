import { mergeRight } from 'ramda'

import BadRequest from './BadRequest'

class ParamError extends BadRequest {
  errors = []

  constructor (errors) {
    super('param-error', 'There is one or more invalid parameters')

    this.errors = errors
  }

  toJson () {
    const json = super.toJson()

    json.body = mergeRight(json.body, { errors: this.errors })

    return json
  }
}

export default ParamError
