import { v4 as uuid } from 'uuid'

import usersService from '../../services/users'
import authenticationService from '../../services/authentication'

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

export default createSession
