import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Sidebar from './Sidebar'
import SidebarMobile from './SidebarMobile'
const MenuNavigation = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1023px)',
  })
  return isDesktopOrLaptop ? <Sidebar /> : <SidebarMobile />
}

export default MenuNavigation
