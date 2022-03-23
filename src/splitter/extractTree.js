import {
  GENERIC_NAV,
  toArray,
  getNavAliases,
  findFieldNavs,
  UI_ORDER
} from '../utils'

export function findRelTree(tree, navs) {
  return navs.reduce((pos, nav) => {
    if (pos[nav] === undefined) {
      pos[nav] = {}
    }
    return pos[nav]
  }, tree)
}

function pushField(tree, field, uiAlias) {
  if (tree[GENERIC_NAV] === undefined) {
    tree[GENERIC_NAV] = {
      fields: [],
      aliases: {}
    }
  }
  tree[GENERIC_NAV].fields.push(field)
  if (uiAlias) {
    tree[GENERIC_NAV].aliases[field] = uiAlias
  }
}

function fillSchemaConf(tree, schema, uiSchema, prefix = '') {
  Object.keys(schema.properties).forEach(field => {
    const fieldSchema = schema.properties[field]
    const fieldUiSchema = uiSchema[field]
    if (fieldSchema.type === 'object' && fieldUiSchema) {
      fillSchemaConf(tree, fieldSchema, fieldUiSchema, field + '.')
    } else {
      const navs = findFieldNavs(field, uiSchema)
      const subTree = findRelTree(tree, navs)
      pushField(subTree, prefix ? prefix + field : field)
    }
  }, {})
}

function fillAliasesConf(tree, uiSchema) {
  const aliases = getNavAliases(uiSchema)
  Object.keys(aliases).forEach(field => {
    const fieldAlias = toArray(aliases[field])
    fieldAlias.forEach(alias => {
      const navs = findFieldNavs(alias, uiSchema)
      const subTree = findRelTree(tree, navs)
      pushField(subTree, field, alias)
    })
  })
}

export function orderFields(tree, fieldsOrder) {
  Object.keys(tree).forEach(nav => {
    if (nav === GENERIC_NAV) {
      const { fields } = tree[nav]
      fields.sort((a, b) => fieldsOrder.indexOf(a) - fieldsOrder.indexOf(b))
    } else {
      orderFields(tree[nav], fieldsOrder)
    }
  })
}

export function extractTree(schema, uiSchema) {
  const tree = {}

  fillSchemaConf(tree, schema, uiSchema)
  fillAliasesConf(tree, uiSchema)

  // Calculate field order, either with UI_ORDER or with natural order
  const fieldsOrder = uiSchema[UI_ORDER]
    ? uiSchema[UI_ORDER]
    : Object.keys(schema.properties)
  orderFields(tree, fieldsOrder)

  return tree
}
