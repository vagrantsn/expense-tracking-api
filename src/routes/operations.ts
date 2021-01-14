import express from 'express'

import operations from '../controllers/operations'
import schemas from '../controllers/operations/schemas'
import schemaValidate from '../middlewares/schema-validate'
import authenticate from '../middlewares/authenticate'

const routes = express.Router()

routes.get(
  '/operations',
  // schemaValidate(schemas.find),
  authenticate,
  operations.find,
)

routes.post(
  '/operations',
  schemaValidate(schemas.create),
  authenticate,
  operations.create
)

export default routes
