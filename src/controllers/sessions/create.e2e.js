const supertest = require('supertest')
const bcrypt = require('bcrypt')

const testdb = require('../../../test/mongo')
const app = require('../../app')

const repositories = require('../../repositories')

const request = supertest(app)

beforeAll(async () => {
  await testdb.connect()
})

afterAll(async () => {
  await testdb.disconnect()
})

test('should respond with required parameters error', async (done) => {
  const response = await request.post('/sessions').send({})

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

test('should respond with authorization token', async (done) => {
  await repositories.user.create({
    email: 'test@email.com',
    password: bcrypt.hashSync('123', 10)
  })

  const { status, body } = await request.post('/sessions').send({
    email: 'test@email.com',
    password: '123',
  })

  expect(status).toBe(200)
  expect(typeof body.token).toBe('string')

  done()
})

test('should respond with unauthorized when credentials are wrong', async (done) => {
  const { status, body } = await request.post('/sessions').send({
    email: 'test-user@email.com',
    password: '1234',
  })

  expect(status).toBe(401)
  expect(body.error).toBe('wrong-credentials')
  expect(body.message).toBe('Invalid e-mail or password')

  done()
})

test('should respond with unauthorized when user does not exist', async (done) => {
  const { status, body } = await request.post('/sessions').send({
    email: 'test-user2@email.com',
    password: '123',
  })

  expect(status).toBe(401)
  expect(body.error).toBe('wrong-credentials')
  expect(body.message).toBe('Invalid e-mail or password')

  done()
})
