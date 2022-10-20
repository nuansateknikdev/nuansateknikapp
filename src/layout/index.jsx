import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthUserContext'
import styles from './layout.module.css'
import { formatDate } from '../utils'
import MenuNavigation from '../components/MenuNavigation'

const Layout = ({ id = '', title = '', subTitle = '', children }) => {
  const { authUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authUser) router.push('/signin')
  }, [authUser, loading, router])

  return authUser ? (
    <div id={`${id}`} style={{ minHeight: '100vh' }}>
      <MenuNavigation />
      <main className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            {title.length ? <h1>{title}</h1> : null}
            {subTitle.length ? <h2>{subTitle}</h2> : null}
          </div>
          <div className={styles.date}>
            <p>{formatDate(new Date())}</p>
          </div>
        </div>
        {children}
      </main>
    </div>
  ) : null
}

export default Layout
