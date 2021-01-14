/**
 * @group unit
 */

import schema from './create'

import schemaValidator from '../../../validations/schema'

test('should not pass if amount is not provided', async () => {
  const body = { label: 'Pizza' }

  try {
    await schemaValidator({
      payload: { body },
      schema,
    })
  } catch (e) {
    expect(e.errors).toContain('body.amount is a required field')
  }
})

test('amount should be an integer', async () => {
  const body = { amount: 123.123 }

  try {
    await schemaValidator({ payload: { body }, schema })
  } catch (e) {
    expect(e.errors).toContain('body.amount must be an integer')
  }
})

test('should not pass if label is not provided', async () => {
  const body = { amount: 123 }

  try {
    await schemaValidator({
      payload: { body },
      schema,
    })
  } catch (e) {
    expect(e.errors).toContain('body.label is a required field')
  }
})

test('label should be a string', async () => {
  const body = { label: 123 }

  try {
    await schemaValidator({ payload: { body }, schema })
  } catch (e) {
    expect(e.errors).toContain('body.label must be a `string` type, but the final value was: `123`.')
  }
})

test('tags should be an array of strings', async () => {
  const body = {
    amount: 1000,
    label: 'Pizza',
    tags: [1, 2, 3]
  }

  try {
    await schemaValidator({ payload: { body }, schema })
  } catch (e) {
    expect(e.errors).toContain('body.tags[0] must be a `string` type, but the final value was: `1`.')
  }
})
