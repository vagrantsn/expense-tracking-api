import { Handler } from 'express'

import wrapAsync from '../wrapper'

import operationsService from '../../services/operations'

const find: Handler = async (req, res) => {
  const {
    amount,
    label,
    tags,
  } = req.query as any & { amount: number, label: string, tags: string[] }

  const { id: userId } = res.locals.authenticated

  const operations = await operationsService.find({
    amount,
    label,
    tags,
    user_id: userId,
  })

  return res.status(200).json({
    data: operations
  })
}

export default wrapAsync(find)
