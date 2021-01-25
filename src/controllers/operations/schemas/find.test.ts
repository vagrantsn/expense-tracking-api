/**
 * @group unit
 */

import schema from './find'

import schemaValidator from '../../../validations/schema'

test('amount should not have non numeric characters', async () => {
  expect.assertions(1)

  const query = { amount: 'abc' }

  try {
    await schemaValidator({ payload: { query }, schema })
  } catch (e) {
    expect(e.errors).toContain('query.amount must match the following: "/\\d+/"')
  }
})

test('label should be a string', async () => {
  expect.assertions(1)

  const query = { label: 123 }

  try {
    await schemaValidator({ payload: { query }, schema })
  } catch (e) {
    expect(e.errors).toContain('query.label must be a `string` type, but the final value was: `123`.')
  }
})

test('tags should be an array of strings', async () => {
  expect.assertions(1)

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
