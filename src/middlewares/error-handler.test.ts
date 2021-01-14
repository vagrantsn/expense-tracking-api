/**
 * @group unit
 */

import errorHandler from './error-handler'

import BaseError from '../errors/BaseError'

const buildExpressResponseObject = () => {
  const status = jest.fn()
  const json = jest.fn()

  const self = {
    mocks: { status, json },
    status: args => {
      status(args)
      return self
    },
    json: args => {
      json(args)
      return self
    }
  }

  return self
}

test('should respond with thrown error', () => {
  const req = jest.fn()
  const res = buildExpressResponseObject()
  const next = jest.fn()

  const error = new BaseError('test-error', 'there was an error', 500)

  errorHandler(error, req, res, next)

  expect(res.mocks.status).toHaveBeenCalledWith(500)
  expect(res.mocks.json).toHaveBeenCalledWith({
    error: 'test-error',
    message: 'there was an error'
  })
})

test('should call next if error is not instance of BaseError', () => {
  const req = jest.fn()
  const res = jest.fn()
  const next = jest.fn()

  const error = new Error('generic')
  errorHandler(error, req, res, next)

  expect(next).toHaveBeenCalledWith(error)
})
