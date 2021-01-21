export default interface Operation {
  id?: string,
  amount: number,
  label: String,
  tags?: String[],
  user_id: String,
  created_at: Date,
  updated_at: Date,
}
