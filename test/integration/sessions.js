const { v4: uuid } = require('uuid')

const usersService = require('../../src/services/users')
const authenticationService = require('../../src/services/authentication')

const createSession = async () => {
  const randomEmail = `${uuid().split('-')[0]}@email.com`
  const randomPassword = uuid()

  const payload = {
    email: randomEmail,
    password: randomPassword,
  }

  const user = await usersService.create(payload)
  const token = await authenticationService.createToken(payload)

  return { user, token }
}

module.exports = createSession
