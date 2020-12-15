const {
  always,
  mergeLeft,
} = require('ramda')

const { BadRequest } = require('../../errors')

const UserDomain = require('.')

test('returns the user when creation succeeds', async () => {
  const payload = { email: 'user@test.com', password: '123' }

  const userdb = {
    create: mergeLeft({ id: 'user-id' }),
    findByEmail: always(null)
  }

  const user = await UserDomain({ user: userdb }).create(payload)

  expect(user.id).toBe('user-id')
  expect(user.email).toBe('user@test.com')
  expect(user.password).not.toBe('123')
})

test('throws BadRequest error when using duplicate email', async () => {
  expect.hasAssertions()

  const userdb = {
    findByEmail: jest
      .fn()
      .mockImplementationOnce(always({ email: 'user@test.com' }))
  }

  const payload = { email: 'user@test.com', password: '123' }

  try {
    await UserDomain({ user: userdb }).create(payload)
  } catch (error) {
    expect(error).toBeInstanceOf(BadRequest)
    expect(error.name).toBe('unavailable-email')
    expect(error.message).toBe('E-mail already registered')
  }
})
