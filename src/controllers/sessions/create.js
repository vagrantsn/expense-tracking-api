const wrapAsync = require('../wrapper')

const authenticationService = require('../../services/authentication')

const create = async (req, res) => {
  const { email, password } = req.body

  const token = await authenticationService.createToken({ email, password })

  return res.status(200).json({ token })
}

module.exports = wrapAsync(create)
