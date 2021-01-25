import Operations from './operations'
import Users from './users'

export { default as Users } from './users'
export { default as Operations } from './operations'

export default interface Database {
  users: Users,
  operations: Operations,
}
