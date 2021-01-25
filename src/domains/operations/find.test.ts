/**
 * @group unit
 */

import operationsDomain from '.'

test('it merges passed query with user_id', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain<any>({ operations })

  const query = {
    label: 'coffee',
    amount: 1000,
    tags: ['food'],
    user_id: 'user-id',
  }

  await domain.find(query)

  expect(findAll).toHaveBeenCalledWith({
    label: 'coffee',
    amount: 1000,
    tags: ['food'],
    user_id: 'user-id',
  }, { createdAt: 'ascending' })
})

test('calls findAll with userId when not filtering by id', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain<any>({ operations })

  const query = {
    user_id: '123',
  }

  await domain.find(query)

  expect(findAll).toHaveBeenCalledWith({
    user_id: '123',
  }, { createdAt: 'ascending' })
})

test('calls findAll with userId when filtering by id', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain<any>({ operations })

  await domain.find({
    id: 'operation-id',
    user_id: '123'
  })

  expect(findAll).toHaveBeenCalledWith({
    id: 'operation-id',
    user_id: '123',
  }, { createdAt: 'ascending' })
})

test('calls findAll with ascending sort by createdAt', async () => {
  const findAll = jest.fn()
  const operations = { findAll }

  const domain = operationsDomain<any>({ operations })

  await domain.find({
    user_id: '123',
  })

  expect(findAll).toHaveBeenCalledWith({
    user_id: '123',
  }, { createdAt: 'ascending' })
})

test('returns the database response', async () => {
  const findAll = () => [{ id: 'operation-id' }]
  const operations = { findAll }

  const domain = operationsDomain<any>({ operations })

  const response = await domain.find({
    user_id: '123'
  })

  expect(response).toEqual([
    { id: 'operation-id' },
  ])
})
