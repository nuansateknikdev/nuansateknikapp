import ProdukMain from '../src/sections/Produk'
import Layout from '../src/layout'
import { firestore } from '../lib/initFirebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { Spin } from 'antd'

export const getServerSideProps = async () => {
  let categoryData = []
  let productData = []
  try {
    const q = query(collection(firestore, 'category'), orderBy('name'))
    const querySnapshots = await getDocs(q)
    querySnapshots.forEach((category) => {
      categoryData.push({
        id: category.id,
        name: category.data().name,
      })
    })
    const queryProduct = query(
      collection(firestore, 'product'),
      orderBy('updateAt')
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
  } catch (err) {
    console.log(err)
    return
  }

  return {
    props: {
      categoryData,
      productData,
    },
  }
}

const Produk = ({ categoryData = null, productData = null }) => {
  const sortProduct = productData.sort(
    (a, b) => Number(new Date(b.updateAt)) - Number(new Date(a.updateAt))
  )
  console.log(sortProduct)
  return (
    <Layout id="produk-page" title="Produk" subTitle="Daftar nama-nama produk">
      {categoryData !== null && productData !== null ? (
        <ProdukMain categoryData={categoryData} productData={sortProduct} />
      ) : (
        <Spin spinning={true}></Spin>
      )}
    </Layout>
  )
}

export default Produk
