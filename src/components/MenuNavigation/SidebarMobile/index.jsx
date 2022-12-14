import Logo from '../../../assets/logo/logo.svg'
import MenuItems from '../MenuItems'
import IcLogout from '../../../assets/icons/icLogout.svg'
import { Button } from 'antd'
import { useAuth } from '../../../../context/AuthUserContext'
import { MenuOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
const SidebarMobile = () => {
  const { signOutAuth } = useAuth()

  const [open, setOpen] = useState(false)
  const [openContent, setopenContent] = useState(false)
  const handleOpen = () => {
    const getBody = document.querySelector('body')
    getBody.classList.add('menu-navigation--mobile--open')
    setOpen(true)
    setTimeout(() => {
      setopenContent(true)
    }, 1)
  }

  const handleClose = () => {
    const getBody = document.querySelector('body')
    getBody.classList.remove('menu-navigation--mobile--open')

    setopenContent(false)
    setTimeout(() => {
      setOpen(false)
    }, 200)
  }
  return (
    <div id="menu-navigation--mobile">
      <div className="menu-navigation--mobile__logo">
        <Logo />
        <MenuOutlined onClick={handleOpen} />
      </div>
      <div
        className={`menu-navigation__sidebar ${
          open ? 'menu-navigation__sidebar--open' : ''
        }`}>
        <div
          className={`menu-navigation__sidebar__content ${
            openContent ? 'menu-navigation__sidebar__content--open' : ''
          }`}>
          <MenuItems />
          <Button className="nt-btn-logout" block onClick={signOutAuth}>
            <IcLogout /> Keluar
          </Button>
        </div>
        <div
          className="menu-navigation__sidebar__overlay"
          onClick={handleClose}></div>
      </div>
    </div>
  )
}

export default SidebarMobile
