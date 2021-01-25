import { Handler } from 'express'

import wrapAsync from '../wrapper'

import operationsService from '../../services/operations'

const create: Handler = async (req, res) => {
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
    user_id: userId,
  })

  return res.status(200).json(operation)
}

export default wrapAsync(create)
