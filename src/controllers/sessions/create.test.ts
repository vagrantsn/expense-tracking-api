/**
 * @group integration
 */

import supertest from 'supertest'
import bcrypt from 'bcrypt'

import testdb from '../../tests/mongo'
import app from '../../app'

import models from '../../models'

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
  expect(body.error.name).toBe('param-error')
  expect(body.error.message).toBe('There is one or more invalid parameters')
  expect(body.error.fields).toEqual([
    'body.email is a required field',
    'body.password is a required field',
  ])

  done()
})

test('should respond with authorization token', async (done) => {
  await models.users.create({
    email: 'test@email.com',
    password: bcrypt.hashSync('123', 10)
  })

  const { status, body } = await request.post('/sessions').send({
    email: 'test@email.com',
    password: '123',
  })

  expect(status).toBe(200)
  expect(typeof body.data.token).toBe('string')

  done()
})

test('should respond with unauthorized when credentials are wrong', async (done) => {
  const { status, body } = await request.post('/sessions').send({
    email: 'test-user@email.com',
    password: '1234',
  })

  expect(status).toBe(401)
  expect(body.error.name).toBe('wrong-credentials')
  expect(body.error.message).toBe('Invalid e-mail or password')

  done()
})

test('should respond with unauthorized when user does not exist', async (done) => {
  const { status, body } = await request.post('/sessions').send({
    email: 'test-user2@email.com',
    password: '123',
  })

  expect(status).toBe(401)
  expect(body.error.name).toBe('wrong-credentials')
  expect(body.error.message).toBe('Invalid e-mail or password')

  done()
})
