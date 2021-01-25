import create from './create'
import findByEmail from './findByEmail'
import findById from './findById'

import { Users } from '../../types/database'

const users: Users = {
  create,
  findByEmail,
  findById,
}

export default users
