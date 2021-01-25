/**
 * @group integration
 */

import supertest from 'supertest'

import testdb from '../../tests/mongo'
import app from '../../app'

import repositories from '../../repositories'

import createSession from '../../tests/integration/sessions'

const request = supertest(app)

beforeEach(async () => {
  await testdb.connect()
})

afterEach(async () => {
  await testdb.disconnect()
})

test('responds with empty array when there are no operations', async () => {
  const { token } = await createSession()

  const { body, status } = await request.get('/operations')
    .set('Authorization', token)

  expect(status).toBe(200)
  expect(body).toEqual([])
})

test('responds with empty array when no operations are found', async () => {
  const { user, token } = await createSession()

  await repositories.operations.create({
    amount: 1000,
    label: 'Coffee',
    tags: ['food'],
    user_id: user.id!,
  })

  const { body, status } = await request.get('/operations')
    .set('Authorization', token)
    .query({
      amount: 1200,
    })

  expect(status).toBe(200)
  expect(body).toEqual([])
})

test('responds with found operations', async () => {
  const { user, token } = await createSession()

  const operation = await repositories.operations.create({
    amount: 1000,
    label: 'Coffee',
    tags: ['food'],
    user_id: user.id!,
  })

  const { body, status } = await request.get('/operations')
    .set('Authorization', token)
    .query({
      amount: 1000,
    })

  expect(status).toBe(200)
  expect(body).toEqual([
    {
      id: operation.id,
      amount: 1000,
      label: 'Coffee',
      tags: ['food'],
      user_id: user.id,
      created_at: operation.created_at?.toISOString(),
      updated_at: operation.updated_at?.toISOString(),
    }
  ])
})

test('responds with found operations sorted by created_at', async () => {
  const { user, token } = await createSession()

  const operation = await repositories.operations.create({
    amount: 1000,
    label: 'Coffee',
    tags: ['food'],
    user_id: user.id!,
  })

  await repositories.operations.create({
    amount: 1000,
    label: 'Cookies',
    tags: ['food'],
    user_id: user.id!,
  })

  const { body, status } = await request.get('/operations')
    .set('Authorization', token)
    .query({
      amount: 1000,
    })

  expect(status).toBe(200)
  expect(body).toHaveLength(2)
  expect(body[0].id).toEqual(operation.id)
})
