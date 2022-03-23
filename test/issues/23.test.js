import React from 'react'
import Form from 'react-jsonschema-form'
import applyPagination from '../../src'
import renderer from 'react-test-renderer'

const schema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      default: ''
    },
    lastName: { type: 'string' }
  }
}
const uiSchema = {
  'ui:order': ['firstName', 'lastName'],
  firstName: {
    classNames: 'col-md-12'
  }
}
const formData = {
  firstName: 'Bill'
}

test('Initial formData rendered', () => {
  const ResForm = applyPagination(Form)
  const component = renderer.create(
    <ResForm schema={schema} uiSchema={uiSchema} formData={formData} />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
