const jwt = require('jsonwebtoken')

const AuthorizationDomain = require('.')

const secret = 'test-secret'
const domain = AuthorizationDomain(secret)

test('returns the authorization token', () => {
  const token = domain.createToken({
    id: 'user-id',
    email: 'user@test.com',
  })

  expect(typeof token).toBe('string')
})

test('should tokenize the user id and email', () => {
  const token = domain.createToken({
    id: 'user-id',
    email: 'user@test.com',
  })

  const { user } = jwt.verify(token, secret)

  expect(user).toEqual({
    id: 'user-id',
    email: 'user@test.com',
  })
})

