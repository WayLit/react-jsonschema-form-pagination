import errorHandler from '../src/errorHandler'
import NavTree from '../src/splitter'

const schema = {
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    nickName: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' }
      }
    }
  }
}

const uiSchema = {
  firstName: { nav: 'FN' },
  lastName: { nav: 'LN' },
  address: { nav: 'AD' }
}

const navTree = new NavTree(schema, uiSchema)

test('active nav added on error', () => {
  const nickErrors = errorHandler(navTree)([
    { property: 'instance', argument: 'nickName' }
  ])
  expect(nickErrors).toEqual([{ property: 'instance', argument: 'nickName' }])

  const fnErrors = errorHandler(navTree)([
    { property: 'instance', argument: 'firstName' }
  ])
  expect(fnErrors).toEqual([
    { property: 'instance', argument: 'firstName', activeNav: [{ nav: 'FN' }] }
  ])

  const lnErrors = errorHandler(navTree)([
    { property: 'instance', argument: 'lastName' }
  ])
  expect(lnErrors).toEqual([
    { property: 'instance', argument: 'lastName', activeNav: [{ nav: 'LN' }] }
  ])
})

test('transform performed', () => {
  const nickErrors = errorHandler(
    navTree,
    () => 'OH NO'
  )([{ property: 'instance', argument: 'nickName' }])
  expect(nickErrors).toEqual('OH NO')
})

test('work with nested', () => {
  const addressErrors = errorHandler(navTree)([
    { property: 'instance.address', argument: 'street' }
  ])
  expect(addressErrors).toEqual([
    {
      property: 'instance.address',
      argument: 'street',
      activeNav: [{ nav: 'AD' }]
    }
  ])
})
