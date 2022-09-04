import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux/store'
import { AuthUserProvider } from '../context/AuthUserContext'

import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../styles/nt-antd-custom.scss'
import '../styles/signin.scss'
import '../styles/beranda.scss'
import '../styles/produk.scss'
import '../styles/sidebar.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthUserProvider>
          <Component {...pageProps} />
        </AuthUserProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
