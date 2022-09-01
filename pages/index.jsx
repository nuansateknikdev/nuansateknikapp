import Layout from '../src/layout'
import BerandaMain from '../src/sections/Beranda'

export default function Home() {
  return (
    <Layout
      id="beranda-page"
      title="Dashboard"
      subTitle="Selamat datang, John Doe">
      <BerandaMain />
    </Layout>
  )
}
