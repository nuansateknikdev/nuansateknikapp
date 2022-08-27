import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthUserContext'

const Layout = ({ children }) => {
  const { authUser, loading, signOutAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (authUser === null) router.push('/signin')
  }, [authUser, loading])

  return (
    <div>
      <nav>
        <button onClick={signOutAuth}>SignOut</button>
      </nav>
      {children}
    </div>
  )
}

export default Layout
