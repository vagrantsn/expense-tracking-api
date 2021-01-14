const formatUserFromDb = user => ({
  id: user._id.toString(),
  email: user.email,
  password: user.password,
})

export default formatUserFromDb
