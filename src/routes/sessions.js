const express = require('express')

const sessions = require('../controllers/sessions')
const schemas = require('../controllers/sessions/schemas')
const schemaValidate = require('../middlewares/schema-validate')

const routes = express.Router()

routes.post(
  '/sessions',
  schemaValidate(schemas.create),
  sessions.create
)

module.exports = routes
