import TransaksiMain from '../src/sections/Transaksi'
import Layout from '../src/layout'
import { Spin } from 'antd'
import { firestore } from '../lib/initFirebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export const getServerSideProps = async () => {
  let categoryData = []
  let productData = []
  try {
    const queryProduct = query(
      collection(firestore, 'product'),
      orderBy('createdAt')
    )
    const querySnapshotsProduct = await getDocs(queryProduct)
    querySnapshotsProduct.forEach((product) => {
      productData.push({
        id: product.id,
        name: product.data().name,
        purchasePrice: product.data().purchasePrice,
        sellingPrice: product.data().sellingPrice,
        stock: product.data().stock,
        category: {
          id: product.data().category.id,
          name: product.data().category.name,
        },
        image: product.data().image,
      })
    })
  } catch (err) {
    console.log(err)
    return
  }

  return {
    props: {
      productData,
    },
  }
}

const Transaksi = ({ productData }) => {
  console.log(productData)
  return (
    <Layout
      id="transaksi-page"
      title="Transaksi"
      subTitle="Lihat dan buat transaksi">
      {productData !== null ? (
        <TransaksiMain productData={productData} />
      ) : (
        <Spin spinning={true}></Spin>
      )}
    </Layout>
  )
}

export default Transaksi
