import create from './create'
import find from './find'

import { Operations } from '../../types/database'

const operations: Operations = {
  create,
  findAll: find,
}

export default operations
