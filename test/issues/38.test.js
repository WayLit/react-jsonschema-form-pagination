/**
 * @jest-environment jsdom
 */

import React from 'react'
import Form from 'react-jsonschema-form'
import applyPagination from '../../src'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'

const schema = {
  type: 'object',
  title: 'Encounter',
  required: [],
  properties: {
    encounter: { type: 'string' },
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
  'ui:order': [
    'encounter',
    'firstName',
    'lastName',
    'age',
    'nickName',
    'bio',
    'password',
    'telephone'
  ],
  firstNameAlias: {
    nav: ['0', 'lastName']
  },
  lastName: {
    nav: ['0', 'lastName']
  },
  age: {
    nav: ['0', 'firstName', 'age']
  },
  nickName: {
    nav: ['0', 'firstName', 'nickName']
  },
  bio: {
    nav: '1'
  },
  password: {
    nav: ['2']
  },
  telephone: {
    nav: '2'
  },
  navConf: {
    aliases: {
      firstName: 'firstNameAlias'
    }
  }
}

test('Re render on activeNav property change', () => {
  let props = { schema, uiSchema, activeNav: ['1'] }
  let ResForm = applyPagination(Form)
  const renderSpy = sinon.spy(ResForm.prototype, 'render')
  const { rerender } = render(<ResForm {...props} />)

  expect(renderSpy.calledOnce).toEqual(true)

  props = { schema, uiSchema, activeNav: ['1'] }
  rerender(<ResForm {...props} />)
  expect(renderSpy.calledOnce).toEqual(true)

  props = { schema, uiSchema, activeNav: ['2'] }
  rerender(<ResForm {...props} />)
  expect(renderSpy.calledTwice).toEqual(true)
})
