/**
 * @group integration
 */

const { Types } = require('mongoose')

const db = require('../../database')

const testdb = require('../../../test/mongo')

const find = require('./find')

let operations

beforeAll(async () => {
  testdb.connect()

  const userId = Types.ObjectId()

  await new db.Operation({
    amount: 1000,
    label: 'Coffee',
    tags: ['food'],
    user_id: userId,
  }).save()

  operations = await find({
    amount: 1000,
    userId,
  })
})

afterAll(async () => {
  await testdb.disconnect()
})

test('returns an array with 1 item', () => {
  expect(operations).toHaveLength(1)
})

test('returns the id as string', () => {
  expect(typeof operations[0].id).toBe('string')
})

test('returns the expected amount', () => {
  expect(operations[0].amount).toBe(1000)
})

test('returns the expected label', () => {
  expect(operations[0].label).toBe('Coffee')
})

test('returns the tags list', () => {
  expect(operations[0].tags).toEqual(['food'])
})

test('returns the userId as string', () => {
  expect(typeof operations[0].user_id).toBe('string')
})

test('returns the createdAt as a Date', () => {
  expect(operations[0].created_at).toBeInstanceOf(Date)
})

test('returns the updatedAt as a Date', () => {
  expect(operations[0].updated_at).toBeInstanceOf(Date)
})

test('returns the expected keys', () => {
  const keys = Object.keys(operations[0]).sort()

  const expected = [
    'id',
    'amount',
    'label',
    'tags',
    'user_id',
    'created_at',
    'updated_at',
  ].sort()

  expect(keys).toEqual(expected)
})
