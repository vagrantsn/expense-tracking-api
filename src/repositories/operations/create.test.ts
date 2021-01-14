/**
 * @group integration
 */

import { Types } from 'mongoose'

import testdb from '../../../test/mongo'

import create from './create'

let operation

beforeAll(async () => {
  testdb.connect()

  const userId = Types.ObjectId()

  operation = await create({
    amount: 1000,
    label: 'Coffee',
    tags: ['drinks'],
    userId,
  })
})

afterAll(async () => {
  await testdb.disconnect()
})

test('returns the id as string', () => {
  expect(typeof operation.id).toBe('string')
})

test('returns the expected amount', () => {
  expect(operation.amount).toBe(1000)
})

test('returns the expected label', () => {
  expect(operation.label).toBe('Coffee')
})

test('returns the tags list', () => {
  expect(operation.tags).toEqual(['drinks'])
})

test('returns the userId as string', () => {
  expect(typeof operation.user_id).toBe('string')
})

test('returns the createdAt as a Date', () => {
  expect(operation.created_at).toBeInstanceOf(Date)
})

test('returns the updatedAt as a Date', () => {
  expect(operation.updated_at).toBeInstanceOf(Date)
})

test('returns the expected keys', () => {
  const keys = Object.keys(operation).sort()

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
