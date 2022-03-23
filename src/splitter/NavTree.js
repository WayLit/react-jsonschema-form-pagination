import { GENERIC_NAV, findFieldNavs } from '../utils'
import extractSubNavs, {
  orderNavByName,
  toNavConfOrDefault
} from './extractSubNavs'
import { extractTree, findRelTree } from './extractTree'
import { asNavField, toHiddenUiSchema } from './util'
import extractSubUiSchema from './extractSubUiSchema'

export default class NavTree {
  constructor(schema, uiSchema) {
    this.tree = extractTree(schema, uiSchema)
    this.schema = schema
    this.uiSchema = uiSchema
  }

  updateActiveNav = (activeNavs, relTree) => {
    relTree = relTree || findRelTree(this.tree, activeNavs)
    const orderedNavs = orderNavByName(Object.keys(relTree), this.uiSchema)
    const nextNav = orderedNavs.find(nav => nav !== GENERIC_NAV)
    if (nextNav) {
      activeNavs.push(nextNav)
      this.updateActiveNav(activeNavs, relTree[nextNav])
    }
  }

  findActiveNav = field => {
    return findFieldNavs(field, this.uiSchema).map(nav =>
      toNavConfOrDefault(nav, this.uiSchema)
    )
  }

  buildUiSchema = (
    activeNav,
    tree,
    uiSchema,
    onNavChange,
    pos = 0,
    navConfs = []
  ) => {
    if (tree[GENERIC_NAV]) {
      const { fields, aliases } = tree[GENERIC_NAV]

      extractSubUiSchema(fields, aliases, this.uiSchema, uiSchema, this.schema)

      if (navConfs.length > 0) {
        asNavField(fields[0], navConfs, uiSchema)
      }
      navConfs = []
    }

    if (activeNav.length === pos) {
      return uiSchema
    }

    const nextTree = tree[activeNav[pos]]
    const nextNavConf = extractSubNavs(
      tree,
      this.uiSchema,
      activeNav.slice(0, pos + 1),
      onNavChange
    )

    return this.buildUiSchema(
      activeNav,
      nextTree,
      uiSchema,
      onNavChange,
      pos + 1,
      navConfs.concat(nextNavConf)
    )
  }

  toSubForms = (activeNav, onNavChange) => {
    const hiddenUiSchema = toHiddenUiSchema(this.schema, this.uiSchema)
    return this.buildUiSchema(activeNav, this.tree, hiddenUiSchema, onNavChange)
  }
}
