const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Unauthorized } = require('../../errors')

const AuthorizationDomain = require('.')

const secret = 'test-secret'

test('returns the authorization token when credentials are correct', async () => {
  const findByEmail = () => ({
    id: 'user-id',
    email: 'user@test.com',
    password: bcrypt.hashSync('test', 10)
  })
  const db = { user: { findByEmail } }

  const domain = AuthorizationDomain({ db, secret })

  const token = await domain.createToken({
    email: 'user@test.com',
    password: 'test',
  })

  expect(typeof token).toBe('string')
})

test('should tokenize the user id and email', async () => {
  const findByEmail = () => ({
    id: 'user-id',
    email: 'user@test.com',
    password: bcrypt.hashSync('test', 10)
  })
  const db = { user: { findByEmail } }

  const domain = AuthorizationDomain({ db, secret })

  const token = await domain.createToken({
    email: 'user@test.com',
    password: 'test',
  })

  const { user } = jwt.verify(token, secret)

  expect(user).toEqual({
    id: 'user-id',
    email: 'user@test.com',
  })
})

test('throws UnauthorizedError when user is not found', async () => {
  const db = { user: { findByEmail: () => null } }

  const domain = AuthorizationDomain({ db, secret })

  try {
    await domain.createToken({
      email: 'user@test.com',
      password: 'test',
    })
  } catch (error) {
    expect(error).toBeInstanceOf(Unauthorized)
    expect(error.name).toBe('wrong-credentials')
    expect(error.message).toBe('Invalid e-mail or password')
  }
})

test('throws UnauthorizedError when credentials are wrong', async () => {
  const findByEmail = () => ({
    email: 'user@test.com',
    password: bcrypt.hashSync('test', 10)
  })
  const db = { user: { findByEmail } }

  const domain = AuthorizationDomain({ db, secret })

  try {
    await domain.createToken({
      email: 'user@test.com',
      password: 'different-password',
    })
  } catch (error) {
    expect(error).toBeInstanceOf(Unauthorized)
    expect(error.name).toBe('wrong-credentials')
    expect(error.message).toBe('Invalid e-mail or password')
  }
})
