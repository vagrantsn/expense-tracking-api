/**
 * @group integration
 */

import supertest from 'supertest'

import testdb from '../../../test/mongo'
import app from '../../app'

import createSession from '../../../test/integration/sessions'

const request = supertest(app)

beforeAll(async () => {
  await testdb.connect()
})

afterAll(async () => {
  await testdb.disconnect()
})

test('should respond with required parameters error', async (done) => {
  const response = await request.post('/operations').send({})

  const { body, status } = response
  expect(status).toBe(400)
  expect(body.error).toBe('param-error')
  expect(body.message).toBe('There is one or more invalid parameters')
  expect(body.errors).toEqual([
    'body.amount is a required field',
    'body.label is a required field',
  ])

  done()
})

test('should respond with the created operation', async (done) => {
  const { user, token } = await createSession()

  const { status, body } = await request.post('/operations')
    .set('Authorization', token)
    .send({
      amount: 1000,
      label: 'Pizza',
      tags: ['food']
    })

  expect(status).toBe(200)
  expect(typeof body.id).toBe('string')
  expect(typeof body.created_at).toBe('string')
  expect(typeof body.updated_at).toBe('string')
  expect(body.amount).toBe(1000)
  expect(body.label).toBe('Pizza')
  expect(body.tags).toEqual(['food'])
  expect(body.user_id).toBe(user.id)

  done()
})

test('should respond with unauthorized when credentials are wrong', async (done) => {
  const { status, body } = await request.post('/operations').send({
    amount: 1000,
    label: 'Pizza',
    tags: ['food']
  })

  expect(status).toBe(401)
  expect(body.error).toBe('unauthorized-authentication')
  expect(body.message).toBe('Unauthorized Access')

  done()
})

test('should respond with unauthorized when user does not exist', async (done) => {
  const { status, body } = await request.post('/operations').send({
    amount: 1000,
    label: 'Pizza',
    tags: ['food']
  })

  expect(status).toBe(401)
  expect(body.error).toBe('unauthorized-authentication')
  expect(body.message).toBe('Unauthorized Access')

  done()
})
