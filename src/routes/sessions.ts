import express from 'express'

import sessions from '../controllers/sessions'
import schemas from '../controllers/sessions/schemas'
import schemaValidate from '../middlewares/schema-validate'

const routes = express.Router()

routes.post(
  '/sessions',
  schemaValidate(schemas.create),
  sessions.create
)

export default routes
