/**
 * @group unit
 */

const schema = require('./create')

const schemaValidator = require('../../../validations/schema')

test('should not pass if email is not provided', async () => {
  const body = { password: '123' }

  try {
    await schemaValidator({
      payload: { body },
      schema,
    })
  } catch (e) {
    expect(e.errors).toContain('body.email is a required field')
  }
})

test('should not pass if email is not on e-mail format', async () => {
  const body = {
    email: 'not-an-email',
    password: '123',
  }

  try {
    await schemaValidator({
      payload: { body },
      schema,
    })
  } catch (e) {
    expect(e.errors).toContain('body.email must be a valid email')
  }
})

test('should not pass if email is not a string', async () => {
  const body = {
    email: 123,
    password: '123',
  }

  try {
    await schemaValidator({
      payload: { body },
      schema,
    })
  } catch (e) {
    expect(e.errors).toContain('body.email must be a `string` type, but the final value was: `123`.')
  }
})

test('should not pass if password is not provided', async () => {
  const body = {
    email: 'test@email.com',
  }

  try {
    await schemaValidator({
      payload: { body },
      schema,
    })
  } catch (e) {
    expect(e.errors).toContain('body.password is a required field')
  }
})

test('should not pass if password is not a string', async () => {
  const body = {
    email: 'test@email.com',
    password: 123,
  }

  try {
    await schemaValidator({
      payload: { body },
      schema,
    })
  } catch (e) {
    expect(e.errors).toContain('body.password must be a `string` type, but the final value was: `123`.')
  }
})

test('should pass if email and password are provided', async () => {
  const body = {
    email: 'test@email.com',
    password: '123',
  }

  const result = await schemaValidator({
    payload: { body },
    schema,
  })

  expect(result).toEqual({ body })
})
