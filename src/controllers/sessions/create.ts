import wrapAsync from '../wrapper'

import authenticationService from '../../services/authentication'

const create = async (req, res) => {
  const { email, password } = req.body

  const token = await authenticationService.createToken({ email, password })

  return res.status(200).json({
    data: { token },
  })
}

export default wrapAsync(create)
