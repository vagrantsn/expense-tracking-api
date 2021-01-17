/**
 * @group unit
 */

import dayjs from 'dayjs'

import operationsDomain from '.'
import Unauthorized from '../../errors/Unauthorized'

test('saves operation with the provided payload', async () => {
  const operationsSave = jest.fn()

  const users = { findById: () => ({ id: 'user-id' }) }
  const operations = { create: operationsSave }

  const domain = operationsDomain({ operations, users })

  const payload = {
    amount: 5000,
    label: 'Pizza',
    tags: ['food'],
    userId: 'user-id',
  }

  await domain.create(payload)

  expect(operationsSave).toHaveBeenCalledWith({
    amount: 5000,
    label: 'Pizza',
    tags: ['food'],
    userId: 'user-id',
  })
})

test('saves empty tags by default', async () => {
  const operationsSave = jest.fn()

  const users = { findById: () => ({ id: 'user-id' }) }
  const operations = { create: operationsSave }

  const domain = operationsDomain({ operations, users })

  const payload = {
    amount: 5000,
    label: 'Pizza',
    userId: 'user-id',
  }

  await domain.create(payload)

  expect(operationsSave).toHaveBeenCalledWith({
    amount: 5000,
    label: 'Pizza',
    tags: [],
    userId: 'user-id',
  })
})

test('returns the newly created operation', async () => {
  const payload = {
    amount: 1000,
    label: 'test operation',
    tags: ['food'],
    userId: 'user-id',
  }

  const mongoResponse = {
    id: 'operation-id',
    createdAt: dayjs(),
    updatedAt: dayjs(),
    ...payload,
  }

  const db = {
    users: {
      findById: () => ({
        id: 'user-id',
      }),
    },
    operations: { create: () => mongoResponse }
  }

  const domain = operationsDomain(db)

  const created = await domain.create(payload)

  expect(created).toEqual(mongoResponse)
})

test('throws unauthorized error if user does not exist', async () => {
  const db = {
    users: {
      findById: () => null,
    },
  }

  const domain = operationsDomain(db)

  try {
    await domain.create({
      amount: 1000,
      label: 'test operation',
      userId: 'test-id',
    })
  } catch (e) {
    expect(e).toBeInstanceOf(Unauthorized)
    expect(e.name).toBe('unauthorized-authentication')
    expect(e.message).toBe('Access unauthorized')
  }
})
