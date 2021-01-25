import { Types } from 'mongoose'

export default interface Operation {
  id?: string,
  amount: number,
  label: string,
  tags?: string[],
  user_id: string|Types.ObjectId,
  created_at?: Date,
  updated_at?: Date,
}
