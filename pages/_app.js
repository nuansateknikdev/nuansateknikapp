import { AuthUserProvider } from '../context/AuthUserContext'
import { useState } from 'react'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../styles/nt-antd-custom.scss'
import '../styles/signin.scss'
import '../styles/beranda.scss'
import '../styles/produk.scss'
import '../styles/sidebar.scss'
import Router from 'next/router'
import Loading from '../src/components/Loading'

function MyApp({ Component, pageProps }) {
  const [loadingRoute, setLoadingRoute] = useState(false)
  Router.events.on('routeChangeStart', (url) => {
    console.log('Route is change', url)
    setLoadingRoute(true)
  })
  Router.events.on('routeChangeComplete', (url) => {
    console.log('Route is complete', url)
    setLoadingRoute(false)
  })
  return (
    <AuthUserProvider>
      <Loading loading={loadingRoute}>
        <Component {...pageProps} />
      </Loading>
    </AuthUserProvider>
  )
}

export default MyApp
