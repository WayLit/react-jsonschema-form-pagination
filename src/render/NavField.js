import React from 'react'
import { getFieldComponent, Label } from './utils'

const navField = NavComponent => props => {
  const {
    schema,
    uiSchema: { navConfs, origUiSchema },
    registry: { fields },
    required,
    idSchema,
    name
  } = props
  const FieldUI = getFieldComponent(props.schema, origUiSchema, fields)
  const fieldConf = Object.assign({}, props, { uiSchema: origUiSchema })

  return (
    <div>
      {navConfs.map((navConf, i) => (
        <div className='col-md-12' key={i}>
          <NavComponent {...navConf} />
          <br />
        </div>
      ))}
      <div className={origUiSchema.classNames}>
        <Label
          schema={schema}
          uiSchema={origUiSchema}
          name={name}
          required={required}
          idSchema={idSchema}
        />
        <FieldUI {...fieldConf} />
      </div>
    </div>
  )
}

export default navField
