const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { omit } = require('ramda')

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
  const user = await repositories.users.create({
    email: 'test@email.com',
    password: bcrypt.hashSync('123', 10)
  })

  const { body: { token } } = await request.post('/sessions').send({
    email: 'test@email.com',
    password: '123',
  })

  const { status, body } = await request.post('/operations')
    .set('Authorization', token)
    .send({
      amount: 1000,
      label: 'Pizza',
      tags: ['food']
    })

  expect(status).toBe(200)
  expect(typeof body.id).toBe('string')
  expect(typeof body.createdAt).toBe('string')
  expect(typeof body.updatedAt).toBe('string')

  const dbProps = ['id', 'createdAt', 'updatedAt']
  expect(omit(dbProps, body)).toEqual({
    amount: 1000,
    label: 'Pizza',
    tags: ['food'],
    userId: user._id.toString(),
  })

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
