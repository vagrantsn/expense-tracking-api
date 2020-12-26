/**
 * @group unit
 */

const yup = require('yup')

const schemaValidate = require('./schema-validate')

const ParamError = require('../errors/ParamError')

const schema = yup.object().shape({
  body: yup.object().shape({ name: yup.string().required() }),
})

test('should call next without args when schema is valid', async () => {
  const req = {
    body: { name: 'test' },
  }
  const res = {}
  const next = jest.fn()

  const middleware = schemaValidate(schema)

  await middleware(req, res, next)

  expect(next).toHaveBeenCalledWith()
})

test('should call next with error when schema is not valid', async () => {
  const req = { body: {} }
  const res = {}
  const next = jest.fn()

  const middleware = schemaValidate(schema)

  await middleware(req, res, next)

  const expectedError = new ParamError(['body.name is a required field'])
  expect(next).toHaveBeenCalledWith(expectedError)
})
