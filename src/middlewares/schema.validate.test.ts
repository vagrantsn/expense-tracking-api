/**
 * @group unit
 */

import {
  object,
  string,
} from 'yup'

import schemaValidate from './schema-validate'

import ParamError from '../errors/ParamError'

const schema = object().shape({
  body: object().shape({ name: string().required() }),
})

test('should call next without args when schema is valid', async () => {
  const req: any = {
    body: { name: 'test' },
  }
  const res: any = {}
  const next = jest.fn()

  const middleware = schemaValidate(schema)

  await middleware(req, res, next)

  expect(next).toHaveBeenCalledWith()
})

test('should call next with error when schema is not valid', async () => {
  const req: any = { body: {} }
  const res: any = {}
  const next = jest.fn()

  const middleware = schemaValidate(schema)

  await middleware(req, res, next)

  const expectedError = new ParamError(['body.name is a required field'])
  expect(next).toHaveBeenCalledWith(expectedError)
})
