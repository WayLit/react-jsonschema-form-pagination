import { withNav } from '../utils'
import splitter from '../../src/splitter'

const schema = {
  properties: {
    firstName: { type: 'string' },
    age: { type: 'string' },
    phone: { type: 'string' },
    lastName: { type: 'string' },
    nickName: { type: 'string' },
    other: { type: 'string' }
  }
}

const uiSchema = {
  firstName: withNav('first'),
  age: withNav(['first', 'age']),
  phone: withNav(['first', 'phone']),
  lastName: withNav('last'),
  nickName: withNav('nick'),
  other: withNav('nick')
}

test('select active in layer', () => {
  const layers = splitter(schema, uiSchema, [{ nav: 'nick' }])

  const activeNavs = []
  layers.updateActiveNav(activeNavs)
  expect(activeNavs).toEqual(['first', 'age'])
})

test('return subforms', () => {
  const layers = splitter(schema, uiSchema)
  const resUiSchema = layers.toSubForms(['first', 'age'], () => {})
  const expectedNav = {
    age: {
      navConfs: [
        {
          navs: {
            activeNav: 'age',
            links: [
              { isActive: true, nav: 'age' },
              { isActive: false, nav: 'phone' }
            ]
          }
        }
      ],
      origUiSchema: {
        nav: ['first', 'age']
      },
      'ui:field': 'nav'
    },
    firstName: {
      navConfs: [
        {
          navs: {
            activeNav: 'first',
            links: [
              { isActive: true, nav: 'first' },
              { isActive: false, nav: 'last' },
              { isActive: false, nav: 'nick' }
            ]
          }
        }
      ],
      origUiSchema: { nav: ['first'] },
      'ui:field': 'nav'
    },
    lastName: { 'ui:field': 'hidden', 'ui:widget': 'hidden' },
    nickName: { 'ui:field': 'hidden', 'ui:widget': 'hidden' },
    other: { 'ui:field': 'hidden', 'ui:widget': 'hidden' },
    phone: { 'ui:field': 'hidden', 'ui:widget': 'hidden' }
  }

  expect(JSON.parse(JSON.stringify(resUiSchema))).toEqual(expectedNav)
})
