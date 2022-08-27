import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthUserContext"


const Signin = () => {
  const { authUser, loading } = useAuth()
  const router = useRouter()

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if(authUser !== null) router.push('/');

  }, [authUser, loading])

  return loading ? <p>loading .....</p> : <h1>Login Page</h1>
}

export default Signin
