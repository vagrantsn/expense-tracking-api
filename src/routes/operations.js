const express = require('express')

const operations = require('../controllers/operations')
const schemas = require('../controllers/operations/schemas')
const schemaValidate = require('../middlewares/schema-validate')
const authenticate = require('../middlewares/authenticate')

const routes = express.Router()

routes.post(
  '/operations',
  schemaValidate(schemas.create),
  authenticate,
  operations.create
)

module.exports = routes
