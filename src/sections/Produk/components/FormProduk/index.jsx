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

const storageDirectory = '/product/'
const docRef = 'product'

// const initUpdateData = {
//   id: 'IcGCKj3PcuOd0j3dmqK2',
//   name: 'LED Muxindo 20 watt',
//   purchasePrice: 10000,
//   sellingPrice: 20000,
//   stock: 10,
//   image: 'testestsetestsetestse',
//   category: {
//     id: 'gNi2C5JE9xlLfuFT0zqC',
//     name: 'lampu',
//   },
// }
const emptyData = {
  id: null,
  name: null,
  purchasePrice: null,
  sellingPrice: null,
  stock: null,
  image: null,
  category: { id: undefined, name: undefined },
}

const FormTambahProduk = ({ initData = emptyData, caterogryData }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(initData.image)
  const [image, setImage] = useState(null)
  const [imageAller, setImageAlert] = useState('')

  const [productForm] = Form.useForm()

  useEffect(() => {
    if (image && typeof image === 'object')
      getBase64(image, (imageUrl) => setImageUrl(imageUrl))
    if (image === null) setImageUrl(null)
  }, [image])

  // Handle Upload and Preview Image
  const uploadButton = (
    <div style={{ width: 50 }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
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

  // const handleRequest = ({ file, onSuccess }) => {
  //   setTimeout(() => {
  //     onSuccess('ok');
  //   }, 0);
  // };

  // const handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     setImage(info.file.originFileObj);
  //     // Get this url from response in real world.
  //     getBase64(
  //       info.file.originFileObj,
  //       (imageUrl) => setImageUrl(imageUrl),
  //       setLoading(false)
  //     );
  //   }
  // };

  // Handle Get Category Name
  const getCategoryName = (id) => {
    return caterogryData.find((category) => category.id === id)
  }
  // Handle on submit
  const handlingUploadError = (error, title) => {
    console.error(error)
    message.error(title)
    setLoading(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
    setLoading(true)
    if (initData.id === null) handleAddData(values)
  }

  const handleAddData = (formData) => {
    const newRef = doc(collection(firestore, docRef))
    const storageRef = ref(storage, storageDirectory + newRef.id)
    const uploadTask = uploadBytesResumable(storageRef, formData.image)

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
            createdAt: serverTimestamp(),
            updateAt: serverTimestamp(),
          })
          setLoading(false)
          message.success('Berhasil Upload Image')
          window.location.reload(false)
        } catch (error) {
          handlingUploadError(error, 'Tambah Produk Gagal')
        }
      }
    )
  }
  const handleUpdateData = () => {}

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
        }}>
        <Form.Item
          label="Nama Produk"
          name="name"
          rules={[
            {
              required: true,
              message: 'Nama produk belum di isi',
            },
          ]}>
          <Input placeholder="Masukkan nama produk" size="large" />
        </Form.Item>
        <Form.Item label="Kategori Produk" name="category">
          <Select placeholder="--Kategori Produk--" size="large" allowClear>
            {caterogryData.map((item) => (
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
          ]}>
          <InputNumber
            placeholder="Masukkan harga beli produk"
            size="large"
            style={{ width: '100%' }}
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
          ]}>
          <InputNumber
            placeholder="Masukkan harga jual produk"
            size="large"
            style={{ width: '100%' }}
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
          ]}>
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
            {imageUrl ? (
              <div className={styles.imgPreview}>
                <img src={imageUrl} alt="image" />
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
            className={styles.btnSumbit}>
            Tambah
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default FormTambahProduk
