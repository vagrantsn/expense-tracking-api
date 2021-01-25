import create from './create'
import find from './find'

import Database from '../../types/database'

const operationsDomain = <T extends Database>(db: T) => ({
  create: create(db),
  find: find(db),
})

export default operationsDomain
