module.exports = controller => async (req, res, next) => {
  try {
    await controller(req, res)
  } catch (e) {
    next(e)
    return
  }

  return true
}
