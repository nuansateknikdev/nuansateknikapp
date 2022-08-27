import Link from 'next/link'
import Layout from '../src/layout'
export default function Home() {
  return (
   <Layout>
      <Link href="/signin">
          <a>signin</a>
      </Link>
   </Layout>
  )
}
