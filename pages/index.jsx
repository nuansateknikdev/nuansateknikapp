import { Spin } from 'antd'
import Layout from '../src/layout'
import BerandaMain from '../src/sections/Beranda'
import { firestore } from '../lib/initFirebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export const getServerSideProps = async () => {
  let transactionData = []
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

    const queryTransaction = query(
      collection(firestore, 'transaction'),
      orderBy('createdAt')
    )
    const querySnapshotsTransaction = await getDocs(queryTransaction)
    querySnapshotsTransaction.forEach((product) => {
      transactionData.push({
        id: product.id,
        products: product.data().products,
        totalPayment: product.data().totalPayment,
        payment: product.data().payment,
        refund: product.data().refund,
        createdAt: product.data().createdAt.toDate().toString(),
      })
    })
  } catch (err) {
    console.log(err)
    return
  }

  return {
    props: {
      productData,
      transactionData,
    },
  }
}

const Home = ({ productData, transactionData }) => {
  return (
    <Layout
      id="beranda-page"
      title="Dashboard"
      subTitle="Selamat datang, Nuansa Teknik"
    >
      {transactionData !== null && productData !== null ? (
        <BerandaMain
          productData={productData}
          transactionData={transactionData}
        />
      ) : (
        <Spin spinning={true}></Spin>
      )}
    </Layout>
  )
}

export default Home
