const InternalError = require('../../errors/InternalError')

const operationsDomain = require('.')

/*
  you can only search for operations you own

  if provided with an id, search by id and returns only one item in a list
  if not provided with an id, search by the parameters provided and returns a list
  if nothing is found, returns an empty list
*/

test('it merges passed query with userId', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  const userId = '123'

  const query = {
    label: 'coffee',
    amount: 1000,
    tags: ['food'],
  }

  await domain.find(userId, query)

  expect(findAll).toHaveBeenCalledWith({
    label: 'coffee',
    amount: 1000,
    tags: ['food'],
    userId: '123',
  }, { createdAt: 'descending' })
})

test('calls findAll with userId when not filtering by id', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  const userId = '123'
  await domain.find(userId)

  expect(findAll).toHaveBeenCalledWith({
    userId: '123',
  }, { createdAt: 'descending' })
})

test('calls findAll with userId when filtering by id', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  const userId = '123'
  await domain.find(userId, { id: 'operation-id' })

  expect(findAll).toHaveBeenCalledWith({
    id: 'operation-id',
    userId: '123',
  }, { createdAt: 'descending' })
})

test('calls findAll with descending sort by createdAt', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  const userId = '123'
  await domain.find(userId)

  expect(findAll).toHaveBeenCalledWith({
    userId: '123',
  }, { createdAt: 'descending' })
})

test('throws InternalError when userId is not provided', async () => {
  const findAll = () => [{ id: 'operation-id' }]
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  try {
    await domain.find(null, {})
  } catch (error) {
    expect(error).toBeInstanceOf(InternalError)
  }
})

test('returns the database response', async () => {
  const findAll = () => [{ id: 'operation-id' }]
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  const userId = '123'
  const response = await domain.find(userId)

  expect(response).toEqual([
    { id: 'operation-id' },
  ])
})
