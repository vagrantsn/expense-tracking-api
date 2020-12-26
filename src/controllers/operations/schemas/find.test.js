/**
 * @group unit
 */

const schema = require('./find')

const schemaValidator = require('../../../validations/schema')

test('amount should be an integer', async () => {
  const query = { amount: 123.123 }

  try {
    await schemaValidator({ payload: { query }, schema })
  } catch (e) {
    expect(e.errors).toContain('query.amount must be an integer')
  }
})

test('label should be a string', async () => {
  const query = { label: 123 }

  try {
    await schemaValidator({ payload: { query }, schema })
  } catch (e) {
    expect(e.errors).toContain('query.label must be a `string` type, but the final value was: `123`.')
  }
})

test('tags should be an array of strings', async () => {
  const query = {
    amount: 1000,
    label: 'Pizza',
    tags: [1, 2, 3]
  }

  try {
    await schemaValidator({ payload: { query }, schema })
  } catch (e) {
    expect(e.errors).toContain('query.tags[0] must be a `string` type, but the final value was: `1`.')
  }
})
