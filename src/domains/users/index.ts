import create from './create'

import Database from '../../types/database'

const UserDomain = <T extends Database>(db: T) => ({
  create: create(db),
})

export default UserDomain
