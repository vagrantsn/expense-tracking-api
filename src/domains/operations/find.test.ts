/**
 * @group unit
 */

import InternalError from '../../errors/InternalError'

import operationsDomain from '.'

test('it merges passed query with userId', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  const userId = '123'

  const query = {
    label: 'coffee',
    amount: 1000,
    tags: ['food'],
    userId: 'user-id',
  }

  await domain.find(userId, query)

  expect(findAll).toHaveBeenCalledWith({
    label: 'coffee',
    amount: 1000,
    tags: ['food'],
    userId: '123',
  }, { createdAt: 'ascending' })
})

test('calls findAll with userId when not filtering by id', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  const userId = '123'
  await domain.find(userId)

  expect(findAll).toHaveBeenCalledWith({
    userId: '123',
  }, { createdAt: 'ascending' })
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
  }, { createdAt: 'ascending' })
})

test('calls findAll with ascending sort by createdAt', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain({ operations })

  const userId = '123'
  await domain.find(userId)

  expect(findAll).toHaveBeenCalledWith({
    userId: '123',
  }, { createdAt: 'ascending' })
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
