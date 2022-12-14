/* eslint-disable @next/next/no-img-element */
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Spin,
} from 'antd'
import { useState } from 'react'
import { storage, firestore } from '../../../../../lib/initFirebase'
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import styles from './formProduk.module.css'
import IconUploadImage from '../../../../assets/icons/ic-upload-image.svg'
import { emptyData } from '../../produk.utils'

const storageDirectory = '/product/'
const docRef = 'product'

const { Option } = Select

const FormTambahProduk = ({ initData = emptyData, categoryData = [] }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(initData.image)
  const [image, setImage] = useState(null)
  const [productForm] = Form.useForm()

  useEffect(() => {
    setImageUrl(initData.image)
  }, [initData])

  useEffect(() => {
    if (image && typeof image === 'object')
      getBase64(image, (imageUrl) => setImageUrl(imageUrl))
    if (image === null) setImageUrl(null)
  }, [image])

  // Handle Upload and Preview Image
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <IconUploadImage />}
      <div style={{ marginTop: 8 }}>
        <span style={{ color: '#1E7FF0' }}>Pilih gambar</span> atau drag gambar
        disini
      </div>
    </div>
  )

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    if (isJpgOrPng && isLt2M) setImage(file)
  }

  // Handle Get Category Name
  const getCategoryName = (id) => {
    return categoryData.find((category) => category.id === id)
  }

  // Handle on submit
  const handlingUploadError = (error, title) => {
    console.error(error)
    message.error(title)
    setLoading(false)
  }

  const handlingTransactionSucces = (title) => {
    message.success(title)
    setLoading(false)
    window.location.reload(false)
  }

  const onFinish = (values) => {
    setLoading(true)
    if (initData.id === null) handleAddData(values)
    else handleUpdateData(values)
  }

  // HANDLING ADD DATA
  const handleAddData = (formData) => {
    const newRef = doc(collection(firestore, docRef))

    const storageRef = ref(storage, storageDirectory + newRef.id)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      null,
      (error) => handlingUploadError(error, 'Tambah Gambar Gagal'),
      async () => {
        // Handle successful uploads on complete
        try {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref)

          await setDoc(newRef, {
            ...formData,
            category: formData.category
              ? getCategoryName(formData.category)
              : { id: null, name: null },
            image: `${imageUrl}`,
            stock: 0,
            createdAt: serverTimestamp(),
            updateAt: serverTimestamp(),
          })
          handlingTransactionSucces('Berhasil Menambahkan Produk')
        } catch (error) {
          handlingUploadError(error, 'Tambah Produk Gagal')
        }
      }
    )
  }

  // HANDLING UPDATE DATA
  const handleUpdateData = (formData) => {
    const productRef = doc(firestore, docRef, initData.id)
    formData.image === initData.image
      ? handleUpdateDataNoImage(formData, productRef)
      : handleUpdateDataWithImage(formData, productRef)
  }
  const handleUpdateDataWithImage = async (formData, productRef) => {
    const storageRef = ref(storage, storageDirectory + initData.id)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      null,
      (error) => handlingUploadError(error, 'Update Gambar Gagal'),
      async () => {
        // Handle successful uploads on complete
        try {
          const urlStorage = await getDownloadURL(uploadTask.snapshot.ref)

          await updateDoc(productRef, {
            ...formData,
            category: formData.category
              ? getCategoryName(formData.category)
              : { id: null, name: null },
            image: `${urlStorage}`,
            updateAt: serverTimestamp(),
          })
          handlingTransactionSucces('Update Menambahkan Produk')
        } catch (error) {
          handlingUploadError(error, 'Update Produk Gagal')
        }
      }
    )
  }
  const handleUpdateDataNoImage = async (formData, productRef) => {
    const { image, category, ...resValue } = formData
    try {
      await updateDoc(productRef, {
        ...resValue,
        category: category
          ? getCategoryName(category)
          : { id: null, name: null },
        updateAt: serverTimestamp(),
      })
      handlingTransactionSucces('Berhasil Update Produk')
    } catch (error) {
      handlingUploadError(error, 'Update Produk Gagal')
    }
  }

  return (
    <Spin spinning={loading}>
      <Form
        form={productForm}
        autoComplete="off"
        layout={'vertical'}
        onFinish={onFinish}
        initialValues={{
          name: initData.name,
          image: initData.image,
          sellingPrice: initData.sellingPrice,
          purchasePrice: initData.purchasePrice,
          category: initData.category.id,
        }}
      >
        <Form.Item
          label="Nama Produk"
          name="name"
          rules={[
            {
              required: true,
              message: 'Nama produk belum di isi',
            },
          ]}
        >
          <Input placeholder="Masukkan nama produk" size="large" />
        </Form.Item>
        <Form.Item label="Kategori Produk" name="category">
          <Select placeholder="Kategori Produk" size="large" allowClear>
            {categoryData.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Harga Beli"
          name="purchasePrice"
          rules={[
            {
              required: true,
              message: 'Harga beli belum di isi',
            },
          ]}
        >
          <InputNumber
            controls={false}
            placeholder="Masukkan harga beli produk"
            size="large"
            style={{ width: '100%' }}
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            prefix="Rp "
            min={0}
            step={1000}
          />
        </Form.Item>
        <Form.Item
          label="Harga Jual"
          name="sellingPrice"
          rules={[
            {
              required: true,
              message: 'Harga beli belum di isi',
            },
          ]}
        >
          <InputNumber
            controls={false}
            placeholder="Masukkan harga jual produk"
            size="large"
            style={{ width: '100%' }}
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            prefix="Rp "
            min={0}
            step={1000}
          />
        </Form.Item>
        <Form.Item
          label="Gambar"
          name="image"
          rules={[
            {
              required: true,
              message: 'Gambar belum di isi',
            },
          ]}
        >
          <Upload
            accept="image/png, image/jpeg, image/jpg"
            style={{ width: '100%' }}
            name="foto"
            listType="picture-card"
            className="avatar-uploader"
            // customRequest={handleRequest}
            showUploadList={false}
            beforeUpload={beforeUpload}
            // onChange={handleChange}
          >
            {imageUrl || initData.image !== null ? (
              <div className={styles.imgPreview}>
                <img src={imageUrl || initData.image} alt="image" />
              </div>
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className={styles.btnSumbit}
          >
            {initData.id === null ? 'Tambah' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default FormTambahProduk
