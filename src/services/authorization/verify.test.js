const dayjs = require('dayjs')

const AuthorizationDomain = require('.')

const secret = 'test-secret'
const domain = AuthorizationDomain(secret)

test('returned token should expire in 1 hour', () => {
  jest.useFakeTimers('modern')

  const token = domain.createToken({
    id: 'user-id',
    email: 'user@test.com',
  })

  const now = dayjs()

  jest.setSystemTime(now.add(59, 'minute').valueOf())
  const beforeExpiring = domain.verify(token)

  jest.setSystemTime(now.add(60, 'minute').valueOf())
  const afterExpiring = domain.verify(token)

  expect(beforeExpiring).toBe(true)
  expect(afterExpiring).toBe(false)
})
