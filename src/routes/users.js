const express = require('express')

const users = require('../controllers/users')
const schemas = require('../controllers/users/schemas')
const schemaValidate = require('../middlewares/schema-validate')

const routes = express.Router()

routes.post(
  '/users',
  schemaValidate(schemas.create),
  users.create
)

module.exports = routes
