import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from '../lib/useFirebaseAuth'

const authUserContext = createContext({
  authUser: null,
  loading: false,
  signInAuth: async () => {},
  signOutAuth: async () => {},
})

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth()
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  )
}

export const useAuth = () => useContext(authUserContext)
