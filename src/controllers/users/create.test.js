/**
 * @group integration
 */

const supertest = require('supertest')

const testdb = require('../../../test/mongo')

const app = require('../../app')

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
  expect(body.error).toBe('param-error')
  expect(body.message).toBe('There is one or more invalid parameters')
  expect(body.errors).toEqual([
    'body.email is a required field',
    'body.password is a required field',
  ])

  done()
})

test('should respond with the created user', async (done) => {
  const response = await request.post('/users').send({
    email: 'user-test@email.com',
    password: '123',
  })

  expect(response.status).toBe(200)
  expect(typeof response.body.id).toBe('string')
  expect(response.body.email).toBe('user-test@email.com')

  done()
})

test('should respond with unavailable email error', async (done) => {
  const payload = {
    email: 'duplicate2@email.com',
    password: '123',
  }

  await request.post('/users').send(payload)

  const response = await request.post('/users').send(payload)

  const { body, status } = response

  expect(status).toBe(400)
  expect(body.error).toBe('unavailable-email')
  expect(body.message).toBe('E-mail already registered')

  done()
})
