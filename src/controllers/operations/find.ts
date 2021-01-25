import wrapAsync from '../wrapper'

import operationsService from '../../services/operations'

const find = async (req, res) => {
  const {
    amount,
    label,
    tags,
  } = req.query

  const { id: userId } = res.locals.authenticated

  const operations = await operationsService.find(userId, {
    amount,
    label,
    tags,
  })

  return res.status(200).json(operations)
}

export default wrapAsync(find)