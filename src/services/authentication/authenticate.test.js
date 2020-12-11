const { hashSync } = require('bcrypt')
const { always } = require('ramda')

const AuthenticationDomain = require('.')

const buildDb = always({
  findByEmail: jest
    .fn()
    .mockImplementation(always({
      id: 'user-id',
      email: 'user@test.com',
      password: hashSync('123', 10),
    }))
})

test('returns the user when login succeeds', async () => {
  const response = await AuthenticationDomain({ user: buildDb() }).authenticate({
    email: 'user@test.com',
    password: '123',
  })

  expect(response).toEqual({
    id: 'user-id',
    email: 'user@test.com'
  })
})

test('returns false when user is not found', async () => {
  const db = { findByEmail: always(null) }

  const user = await AuthenticationDomain({ user: db }).authenticate({
    email: 'user@test.com',
    password: '123',
  })

  expect(user).toBe(false)
})

test('returns false when password is incorrect', async () => {
  const user = await AuthenticationDomain({ user: buildDb() }).authenticate({
    email: 'user@test.com',
    password: '1234',
  })

  expect(user).toBe(false)
})
