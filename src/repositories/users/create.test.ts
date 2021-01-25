/**
 * @group integration
 */

import { Types } from 'mongoose'

import testdb from '../../../test/mongo'

import User from '../../types/user'
import create from './create'

let user: User

beforeAll(async () => {
  testdb.connect()

  const userId = Types.ObjectId()

  user = await create({
    email: 'test@email.com',
    password: '123',
  })
})

afterAll(async () => {
  await testdb.disconnect()
})

test('returns the id as string', () => {
  expect(typeof user.id).toBe('string')
})

test('returns the expected email', () => {
  expect(user.email).toBe('test@email.com')
})

test('returns the expected password', () => {
  expect(user.password).toBe('123')
})

test('returns the expected keys', () => {
  const keys = Object.keys(user).sort()

  const expected = [
    'id',
    'email',
    'password',
  ].sort()

  expect(keys).toEqual(expected)
})
