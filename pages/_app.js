import { AuthUserProvider } from '../context/AuthUserContext'
import '../styles/globals.css'
import '../styles/signin.scss'
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}

export default MyApp
