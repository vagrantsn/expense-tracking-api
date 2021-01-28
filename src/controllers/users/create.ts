import wrapAsync from '../wrapper'

import usersService from '../../services/users'

const create = async (req, res) => {
  const { email, password } = req.body

  const user = await usersService.create({ email, password })

  return res.json({
    data: {
      id: user.id,
      email: user.email,
    },
  })
}

export default wrapAsync(create)
