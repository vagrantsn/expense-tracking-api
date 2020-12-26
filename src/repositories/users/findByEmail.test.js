/**
 * @group integration
 */

const db = require('../../database')

const testdb = require('../../../test/mongo')

const findByEmail = require('./findByEmail')

let user

beforeAll(async () => {
  testdb.connect()

  await new db.User({
    email: 'test@email.com',
    password: '123',
  }).save()

  user = await findByEmail('test@email.com')
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
