import create from './create'
import find from './find'

const operationsDomain = db => ({
  create: create(db),
  find: find(db),
})

export default operationsDomain
