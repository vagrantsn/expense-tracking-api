import express from 'express'

import users from '../controllers/users'
import schemas from '../controllers/users/schemas'
import schemaValidate from '../middlewares/schema-validate'

const routes = express.Router()

routes.post(
  '/users',
  schemaValidate(schemas.create),
  users.create
)

export default routes
