process.env.JWT_SECRET = '123'

const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

const authenticate = require('./authenticate')

const Unauthorized = require('../errors/Unauthorized')

const secret = process.env.JWT_SECRET

test('calls next when authentication token is valid', async () => {
  const req = {
    get: param => {
      if (param === 'Authorization') {
        const user = { id: 'user-id', email: 'test@email.com' }

        return jwt.sign({ user }, secret)
      }
    }
  }

  const res = {}
  const next = jest.fn()

  await authenticate(req, res, next)

  expect(next).toBeCalledWith()
})

test('throws Unauthorized error when authentication token is invalid', async () => {
  const user = { id: 'user-id', email: 'test@email.com' }
  const options = { expiresIn: '1h' }
  const token = jwt.sign({ user }, secret, options)

  const req = {
    get: param => {
      if (param === 'Authorization') {
        return token
      }
    }
  }

  const res = {}
  const next = {}

  const now = dayjs()
  jest.setSystemTime(now.add(60, 'minute').valueOf())

  try {
    await authenticate(req, res, next)
  } catch (e) {
    expect(e).toBeInstanceOf(Unauthorized)
    expect(e.name).toBe('unauthorized-authentication')
    expect(e.message).toBe('Access unauthorized')
  }
})

