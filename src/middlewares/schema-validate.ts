import { Handler } from 'express'
import { AnySchema } from 'yup'

import ParamError from '../errors/ParamError'

import schemaValidator from '../validations/schema'

const schemaValidate = (schema: AnySchema): Handler => async (req, res, next) => {
  const { body, params, query } = req

  try {
    const payload = { body, params, query }
    await schemaValidator({ payload, schema })
    return next()
  } catch (validationError) {
    const error = new ParamError(validationError.errors)
    return next(error)
  }
}

export default schemaValidate
