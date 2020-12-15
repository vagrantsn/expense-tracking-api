const wrapAsync = require('./wrapper')

test('should return true if controller succeeds', async () => {
  const req = jest.fn()
  const res = jest.fn()
  const next = jest.fn()

  const wrapped = wrapAsync(() => 1)
  const result = await wrapped(req, res, next)

  expect(result).toBe(true)
})

test('should call next if controller throws', async () => {
  const req = jest.fn()
  const res = jest.fn()
  const next = jest.fn()

  const error = new Error('test')

  const wrapped = wrapAsync(() => { throw error })
  const result = await wrapped(req, res, next)

  expect(result).toBe(undefined)
  expect(next).toHaveBeenCalledWith(error)
})
