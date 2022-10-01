import TransaksiMain from '../src/sections/Transaksi'
import Layout from '../src/layout'
import { Spin } from 'antd'
import { firestore } from '../lib/initFirebase'
import {
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  limit,
} from 'firebase/firestore'

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
        createdAt: product.data().createdAt.toDate().toString(),
        updateAt: product.data().createdAt.toDate().toString(),
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

const Transaksi = ({ productData, transactionData }) => {
  return (
    <Layout
      id="transaksi-page"
      title="Transaksi"
      subTitle="Lihat dan buat transaksi"
    >
      {productData !== null && transactionData !== null ? (
        <TransaksiMain
          productData={productData}
          transactionData={transactionData}
        />
      ) : (
        <Spin spinning={true}></Spin>
      )}
    </Layout>
  )
}

export default Transaksi
