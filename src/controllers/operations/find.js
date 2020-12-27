const wrapAsync = require('../wrapper')

const operationsService = require('../../services/operations')

const toJson = require('../../formatters/json/operation')

const find = async (req, res) => {
  const {
    amount,
    label,
    tags,
  } = req.query

  const { id: userId } = res.locals.authenticated

  const operations = (await operationsService.find(userId, {
    amount,
    label,
    tags,
  })).map(toJson)

  return res.status(200).json(operations)
}

module.exports = wrapAsync(find)
