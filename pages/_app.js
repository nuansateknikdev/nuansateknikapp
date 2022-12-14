import { AuthUserProvider } from '../context/AuthUserContext'
import { ProductProvider } from '../context/ProductContext'
import { useState } from 'react'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../styles/main.scss'
import '../styles/sidebar.scss'
import '../styles/nt-antd-custom.scss'
import '../styles/signin.scss'
import '../styles/beranda.scss'
import '../styles/produk.scss'
import '../styles/transaksi.scss'

import Router from 'next/router'
import Loading from '../src/components/Loading'

function MyApp({ Component, pageProps }) {
  const [loadingRoute, setLoadingRoute] = useState(false)
  Router.events.on('routeChangeStart', (url) => {
    const getBody = document.querySelector('body')
    getBody.classList.remove('menu-navigation--mobile--open')
    console.log('Route is change', url)
    setLoadingRoute(true)
  })
  Router.events.on('routeChangeComplete', (url) => {
    console.log('Route is complete', url)
    setLoadingRoute(false)
  })
  return (
    <AuthUserProvider>
      <ProductProvider>
        <Loading loading={loadingRoute}>
          <Component {...pageProps} />
        </Loading>
      </ProductProvider>
    </AuthUserProvider>
  )
}

export default MyApp
