const formatUserFromDb = user => ({
  id: user._id.toString(),
  email: user.email,
  password: user.password,
})

module.exports = formatUserFromDb
