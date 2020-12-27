/**
 * @group integration
 */

const supertest = require('supertest')

const testdb = require('../../../test/mongo')
const app = require('../../app')

const repositories = require('../../repositories')

const createSession = require('../../../test/integration/sessions')

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
    userId: user.id,
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
    userId: user.id,
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
      created_at: operation.createdAt.toISOString(),
      updated_at: operation.updatedAt.toISOString(),
    }
  ])
})

test('responds with found operations sorted by createdAt', async () => {
  const { user, token } = await createSession()

  const operation = await repositories.operations.create({
    amount: 1000,
    label: 'Coffee',
    tags: ['food'],
    userId: user.id,
  })

  await repositories.operations.create({
    amount: 1000,
    label: 'Cookies',
    tags: ['food'],
    userId: user.id,
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
