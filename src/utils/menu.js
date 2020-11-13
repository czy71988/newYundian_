
// 获取菜单项
const _getMenuItems = (routes) => {
  let menuItems = []
  routes.map((route) => {
    if (route.children && route.children.length) {
      menuItems = [...menuItems, ..._getMenuItems(route.children)]
    } else if (route.meta && route.meta.menu) {
      menuItems.push(route)
    }
  })
  return menuItems
}

const getMenusByRoutes = (routes) => {
  const menuItems = _getMenuItems(routes)
  console.log(menuItems)
  return []
}

export {
  getMenusByRoutes
}
