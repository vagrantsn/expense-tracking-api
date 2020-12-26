const wrapAsync = require('../wrapper')

const usersService = require('../../services/users')

const create = async (req, res) => {
  const { email, password } = req.body

  const user = await usersService.create({ email, password })

  return res.json({
    id: user.id,
    email: user.email,
  })
}

module.exports = wrapAsync(create)
