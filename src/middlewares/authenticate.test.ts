/**
 * @group unit
 */

process.env.JWT_SECRET = '123'

import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { SchemaTypes } from 'mongoose'

SchemaTypes['ClockDate'] = SchemaTypes.Date

import authenticate from './authenticate'

import Unauthorized from '../errors/Unauthorized'

const secret = process.env.JWT_SECRET

test('calls next when authentication token is valid', async () => {
  const req: any = {
    get: param => {
      if (param === 'Authorization') {
        const user = { id: 'user-id', email: 'test@email.com' }

        return jwt.sign({ user }, secret)
      }
    }
  }

  const res: any = { locals: {} }
  const next = jest.fn()

  await authenticate(req, res, next)

  expect(next).toBeCalledWith()
})

test('adds authenticated user to res.locals.authenticated', async () => {
  const req: any = {
    get: param => {
      if (param === 'Authorization') {
        const user = { id: 'user-id', email: 'test@email.com' }

        return jwt.sign({ user }, secret)
      }
    }
  }

  const res : any = { locals: {} }
  const next = jest.fn()

  await authenticate(req, res, next)

  expect(res.locals.authenticated).toEqual({
    id: 'user-id',
    email: 'test@email.com',
  })
})

test('calls next with Unauthorized error when authentication token is invalid', async () => {
  jest.useFakeTimers('modern')

  const user = { id: 'user-id', email: 'test@email.com' }
  const options = { expiresIn: '1h' }
  const token = jwt.sign({ user }, secret, options)

  const req: any = {
    get: param => {
      if (param === 'Authorization') {
        return token
      }
    }
  }

  const res: any = {}
  const next = jest.fn()

  const now = dayjs()
  jest.setSystemTime(now.add(60, 'minute').valueOf())

  await authenticate(req, res, next)

  const expectedError = new Unauthorized('unauthorized-authentication', 'Unauthorized Access')
  expect(next).toHaveBeenCalledWith(expectedError)
})

