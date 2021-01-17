import db from '../../database'

import formatUser from './format'

const create = async (
  { email, password } :
  { email: string, password: string}
) => {
  const user = await new db.User({ email, password }).save()

  return formatUser(user)
}

export default create
