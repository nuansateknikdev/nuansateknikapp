import { useState, useEffect } from 'react'
import { auth } from './initFirebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { message } from 'antd'

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
})

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const clear = () => {
    setAuthUser(null)
    setLoading(false)
  }

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const signInAuth = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        message.success('Login berhasil')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        if (errorCode === 'auth/user-not-found') {
          message.error('Email belum terdaftar')
        } else if (errorCode === 'auth/wrong-password') {
          message.error('Password salah')
        } else {
          message.error(errorCode)
        }
      })

  const signOutAuth = () => signOut(auth).then(clear)

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    signOutAuth,
    signInAuth,
  }
}
