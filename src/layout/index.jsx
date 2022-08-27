import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from '../../context/AuthUserContext'

const Layout = ({children}) => {
  const { authUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(authUser === null) router.push('/signin');
  }, [authUser, loading])

  return (
    <div>{children}</div>
  )
}

export default Layout