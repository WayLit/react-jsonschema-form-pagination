import extractSubNavs, { orderNavs } from '../../src/splitter/extractSubNavs'

test('simple ordering', () => {
  const navs = [{ nav: 'Second' }, { nav: 'First' }]
  expect(orderNavs(navs, { navConf: { order: ['First', 'Second'] } })).toEqual([
    { nav: 'First' },
    { nav: 'Second' }
  ])
  expect(orderNavs(navs, { navConf: { order: ['First'] } })).toEqual([
    { nav: 'First' },
    { nav: 'Second' }
  ])
})

test('no ordering', () => {
  const navs = [{ nav: 'Second' }, { nav: 'First' }]
  expect(orderNavs(navs, {})).toEqual([{ nav: 'Second' }, { nav: 'First' }])
})

test('unrelated ordering', () => {
  const navs = [{ nav: 'Second' }, { nav: 'First' }]
  expect(orderNavs(navs, { navConf: { order: ['Last'] } })).toEqual([
    { nav: 'Second' },
    { nav: 'First' }
  ])
})

test('create default configs', () => {
  const tree = { 1: {}, 2: {} }
  const uiSchema = {
    navConf: { navs: [{ nav: '1', name: 'Some' }] }
  }
  const navs = extractSubNavs(tree, uiSchema, '1')
  const expectedNavs = {
    navs: {
      activeNav: '1',
      links: [
        { isActive: true, name: 'Some', nav: '1' },
        { isActive: false, nav: '2' }
      ]
    }
  }
  expect(JSON.parse(JSON.stringify(navs))).toEqual(expectedNavs)
})
