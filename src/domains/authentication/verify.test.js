const dayjs = require('dayjs')
const bcrypt = require('bcrypt')

const AuthorizationDomain = require('.')

const secret = 'test-secret'

test('returned token should expire in 1 hour', async () => {
  const findByEmail = () => ({
    id: 'user-id',
    email: 'user@test.com',
    password: bcrypt.hashSync('test', 10)
  })
  const db = { users: { findByEmail } }

  const domain = AuthorizationDomain({ db, secret })

  jest.useFakeTimers('modern')

  const token = await domain.createToken({
    email: 'user@test.com',
    password: 'test',
  })

  const now = dayjs()

  jest.setSystemTime(now.add(59, 'minute').valueOf())
  const beforeExpiring = domain.verify(token)

  jest.setSystemTime(now.add(60, 'minute').valueOf())
  const afterExpiring = domain.verify(token)

  expect(beforeExpiring).toEqual({ id: 'user-id', email: 'user@test.com' })
  expect(afterExpiring).toBe(false)
})
