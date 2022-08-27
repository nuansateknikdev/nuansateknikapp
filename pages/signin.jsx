import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthUserContext'
import SigninMain from '../src/sections/Signin'
import { Spin } from 'antd'

const Signin = () => {
  const { authUser, loading } = useAuth()
  const router = useRouter()

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (authUser !== null) router.push('/')
  }, [authUser, loading])

  return (
    <Spin spinning={loading}>
      <SigninMain />
    </Spin>
  )
}

export default Signin
