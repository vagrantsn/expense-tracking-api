import create from './create'

const UserDomain = db => ({
  create: create(db),
})

export default UserDomain
