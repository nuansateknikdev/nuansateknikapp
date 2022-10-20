import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthUserContext'
import SigninMain from '../src/sections/Signin'
import { Spin } from 'antd'
import Head from 'next/head'
const Signin = () => {
  const { authUser, loading } = useAuth()
  const router = useRouter()

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (authUser) router.push('/')
  }, [authUser, loading, router])

  return !authUser ? (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Spin spinning={loading}>
        <SigninMain />
      </Spin>
    </>
  ) : null
}

export default Signin
