import { GENERIC_NAV } from '../utils'

export function toNavConf(nav, { navConf: { navs = [] } = {} }) {
  return navs.find(conf => conf.nav === nav)
}

export function toNavConfOrDefault(nav, uiSchema) {
  const navConf = toNavConf(nav, uiSchema)
  return navConf || { nav }
}

export function orderNavByName(navs, { navConf: { order = [] } = {} }) {
  if (!order || order.length === 0) {
    return navs
  }

  const orderedNavs = navs
    .filter(nav => order.includes(nav))
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
  if (orderedNavs.length === 0) {
    return navs
  }
  if (orderedNavs.length === navs.length) {
    return orderedNavs
  }

  const nonOrderedNavs = navs.filter(nav => !orderedNavs.includes(nav))
  return orderedNavs.concat(nonOrderedNavs)
}

export function orderNavs(navs, uiSchema) {
  const navNames = navs.map(({ nav }) => nav)
  const orderedNavs = orderNavByName(navNames, uiSchema)
  return orderedNavs.map(ordNav => navs.find(({ nav }) => nav === ordNav))
}

export function buildNavs(tree, uiSchema, activeNav) {
  const navs = Object.keys(tree)
    .filter(nav => nav !== GENERIC_NAV)
    .map(nav => toNavConfOrDefault(nav, uiSchema))
    .map(nav => Object.assign({ isActive: nav.nav === activeNav }, nav))
  const orderedNavs = orderNavs(navs, uiSchema)
  return { links: orderedNavs, activeNav }
}

export default function extractSubNavs(tree, uiSchema, navPath, onNavChange) {
  const activeNav = navPath[navPath.length - 1]
  const navs = buildNavs(tree, uiSchema, activeNav)
  if (navs && navs.links.length > 0) {
    return {
      navs,
      onNavChange: nav => {
        const selectedNav =
          navPath.length === 0
            ? [nav]
            : navPath.slice(0, navPath.length - 1).concat([nav])
        onNavChange(selectedNav)
      }
    }
  } else {
    return undefined
  }
}
