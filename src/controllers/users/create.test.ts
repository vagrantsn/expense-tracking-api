/**
 * @group integration
 */

import supertest from 'supertest'

import testdb from '../../tests/mongo'

import app from '../../app'

const request = supertest(app)

beforeAll(async () => {
  await testdb.connect()
})

afterAll(async () => {
  await testdb.disconnect()
})

test('should respond with required parameters error', async (done) => {
  const response = await request.post('/users').send({})

  const { body, status } = response
  expect(status).toBe(400)
  expect(body.error.name).toBe('param-error')
  expect(body.error.message).toBe('There is one or more invalid parameters')
  expect(body.error.fields).toEqual([
    'body.email is a required field',
    'body.password is a required field',
  ])

  done()
})

test('should respond with the created user', async (done) => {
  const { body, status } = await request.post('/users').send({
    email: 'user-test@email.com',
    password: '123',
  })

  expect(status).toBe(200)
  expect(typeof body.data.id).toBe('string')
  expect(body.data.email).toBe('user-test@email.com')

  done()
})

test('should respond with unavailable email error', async (done) => {
  const payload = {
    email: 'duplicate2@email.com',
    password: '123',
  }

  await request.post('/users').send(payload)

  const { body, status } = await request.post('/users').send(payload)

  expect(status).toBe(400)
  expect(body.error.name).toBe('unavailable-email')
  expect(body.error.message).toBe('E-mail already registered')

  done()
})
