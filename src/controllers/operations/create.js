const wrapAsync = require('../wrapper')

const operationsService = require('../../services/operations')

const toJson = require('../../formatters/json/operation')

const create = async (req, res) => {
  const {
    amount,
    label,
    tags,
  } = req.body

  const { id: userId } = res.locals.authenticated

  const operation = await operationsService.create({
    amount,
    label,
    tags,
    userId,
  })

  return res.status(200).json(toJson(operation))
}

module.exports = wrapAsync(create)
