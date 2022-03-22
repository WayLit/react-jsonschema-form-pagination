/**
 * @jest-environment jsdom
 */
import { withNav } from './utils'
import applyPagination from '../src'
import React from 'react'
import Form from 'react-jsonschema-form'
import sinon from 'sinon'
import { fireEvent, render, screen } from '@testing-library/react'

let schema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    nickName: { type: 'string' }
  }
}

let uiSchema = {
  firstName: withNav('first'),
  lastName: withNav('last'),
  nickName: withNav('nick'),
  navConf: {
    order: ['first', 'last', 'nick']
  }
}

test('onTabChange ignored on clicking selected', () => {
  const onNavChange = sinon.spy()
  let ResForm = applyPagination(Form)
  render(
    <ResForm schema={schema} uiSchema={uiSchema} onNavChange={onNavChange} />
  )

  fireEvent.click(screen.getByText('first'))
  expect(onNavChange.callCount).toEqual(0)
})

test('onNavChange triggered on new selection', () => {
  const onNavChange = sinon.spy()
  let ResForm = applyPagination(Form)
  render(
    <ResForm schema={schema} uiSchema={uiSchema} onNavChange={onNavChange} />
  )

  fireEvent.click(screen.getByText('nick'))
  expect(onNavChange.callCount).toEqual(1)
  expect(onNavChange.getCall(0).args[0]).toEqual(['nick'])
  expect(onNavChange.getCall(0).args[1]).toEqual(['first'])
})
