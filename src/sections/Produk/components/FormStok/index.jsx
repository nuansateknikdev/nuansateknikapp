import { useState } from 'react'
import { Button, Spin, Input, InputNumber, message } from 'antd'
import { emptyData } from '../../produk.utils'
import { firestore } from '../../../../../lib/initFirebase'
import { serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore'
import IcPlusCircle from '../../../../assets/icons/ic-plus-circle.svg'
import IcMinusCircle from '../../../../assets/icons/ic-minus-circle.svg'

const FormTambahStok = ({ initData = emptyData }) => {
  const [loading, setLoading] = useState(false)
  const [addStockVal, setAddStockVal] = useState(1)

  const onFinish = async () => {
    setLoading(true)
    try {
      const productRef = doc(firestore, 'product', initData.id)
      await updateDoc(productRef, {
        stock: increment(addStockVal),
        updateAt: serverTimestamp(),
      })
      message.success('Tambah Stock Berhasil')
      setLoading(false)
      window.location.reload(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
      message.error('Tambah Stock Gagal!')
      setLoading(false)
    }
  }

  const onbtnPlusClick = () => {
    setAddStockVal(addStockVal + 1)
  }

  const onbtnMinusClick = () => {
    addStockVal === 1 ? setAddStockVal(1) : setAddStockVal(addStockVal - 1)
  }

  const handleAddStockChange = (value) => {
    if (addStockVal >= 1) setAddStockVal(value)
    else setAddStockVal(1)
  }

  return (
    <Spin spinning={loading}>
      <div id="product-page__form-add-stock">
        <div name="name">
          <label>Nama Produk</label>
          <Input
            placeholder="Masukkan nama produk"
            size="large"
            readOnly
            value={initData.name}
          />
        </div>
        <div>
          <label>Nama Produk</label>
          <div className="product-page__form-add-stock__grid">
            <div>
              <InputNumber size="large" readOnly value={initData.stock} />
              <span>*lakukan penambahan stok disini</span>
            </div>
            <div>
              <div className="product-page__form-add-stock__input">
                <IcMinusCircle onClick={onbtnMinusClick} />
                <InputNumber
                  controls={false}
                  onChange={handleAddStockChange}
                  size="large"
                  prefix="x"
                  min={1}
                  value={addStockVal}
                />
                <IcPlusCircle onClick={onbtnPlusClick} />
              </div>
              <span>*lakukan penambahan stok disini</span>
            </div>
          </div>
        </div>
        <Button className="ant-btn-primary" block onClick={onFinish}>
          Tambah Stok
        </Button>
      </div>
    </Spin>
  )
}

export default FormTambahStok
