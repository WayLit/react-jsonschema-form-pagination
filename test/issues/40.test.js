/**
 * @jest-environment jsdom
 */

import React from 'react'
import Form from 'react-jsonschema-form'
import applyPagination from '../../src'
import { render } from '@testing-library/react'

const schema = {
  type: 'object',
  title: 'Encounter',
  required: [],
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    age: { type: 'integer' },
    nickName: { type: 'string' },
    bio: { type: 'string' },
    password: { type: 'string' },
    telephone: { type: 'string' }
  }
}

const uiSchema = {
  firstName: {
    nav: '0'
  },
  lastName: {
    nav: '0'
  },
  age: {
    nav: '1'
  },
  nickName: {
    nav: '1'
  },
  bio: {
    nav: '1'
  },
  password: {
    nav: '2'
  },
  telephone: {
    nav: '2'
  },
  navConf: {
    aliases: {
      firstName: 'firstNameAlias'
    },
    navs: [
      { nav: '0', name: 'First' },
      { nav: '1', name: 'Second' },
      { nav: '2', name: 'Third' }
    ]
  }
}

test('Re render on activeNav property change', () => {
  let props = { schema, uiSchema, activeNav: ['1'] }
  const ResForm = applyPagination(Form)
  const { rerender } = render(<ResForm {...props} />)
  props = { ...props, formData: { firstName: 'A' } }

  rerender(<ResForm {...props} />)

  const expectedNavs = [
    { nav: '0', name: 'First' },
    { nav: '1', name: 'Second' },
    { nav: '2', name: 'Third' }
  ]

  expect(uiSchema.navConf.navs).toEqual(expectedNavs)
})
