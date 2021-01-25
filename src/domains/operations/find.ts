import { Query } from '../../types/database/operations'
import Database from '../../types/database'

const find = (db: Database) => async (query : Query) => {
  const result = await db.operations.findAll(
    query,
    { createdAt: 'ascending' }
  )

  return result
}

export default find
