import { AuthUserProvider } from '../context/AuthUserContext'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../styles/nt-antd-custom.scss'
import '../styles/signin.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}

export default MyApp
