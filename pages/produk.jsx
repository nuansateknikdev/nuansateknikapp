import ProdukMain from '../src/sections/Produk'
import Layout from '../src/layout'
import { firestore } from '../lib/initFirebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { Spin } from 'antd'

export const getServerSideProps = async () => {
  let caterogryData = []
  let productData = []
  try {
    const q = query(collection(firestore, 'category'), orderBy('name'))
    const querySnapshots = await getDocs(q)
    querySnapshots.forEach((category) => {
      caterogryData.push({
        id: category.id,
        name: category.data().name,
      })
    })

    // const queryProduct = query(
    //   collection(firestore, 'product'),
    //   orderBy('created_at')
    // )

    // const querySnapshotsProduct = await getDocs(queryProduct)

    // querySnapshotsProduct.forEach((product) => {
    //   productData.push({
    //     id: product.id,
    //     name: product.data().name,
    //     purchasePrice: product.data().purchasePrice,
    //     sellingPrice: product.data().sellingPrice,
    //     sellingPrice: product.data().sellingPrice,
    //     stock: product.data().stock,
    //     category: {
    //       id: product.data().category.id,
    //       name: product.data().category.name,
    //     },
    //   })
    // })
  } catch (err) {
    console.log(err)
    return
  }

  return {
    props: {
      caterogryData,
      productData,
    },
  }
}

const Produk = ({ caterogryData = [], productData = [] }) => {
  console.log(productData)
  console.log(caterogryData.length)
  return (
    <Layout id="produk-page" title="Produk" subTitle="Daftar nama-nama produk">
      {caterogryData.length ? (
        <ProdukMain caterogryData={caterogryData} />
      ) : (
        <Spin spinning={true}></Spin>
      )}
    </Layout>
  )
}

export default Produk
