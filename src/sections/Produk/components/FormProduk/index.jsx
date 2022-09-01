import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useState } from 'react';

// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };

const FormTambahProduk = () => {
  const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState(null);
  // const [image, setImage] = useState(null);

  const uploadButton = (
    <div style={{ width: 50 }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

  return (
    <Form
      // form={form}
      layout={'vertical'}
      // onFinish={onFinish}
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
      <Form.Item
        label="Kategori Produk"
        name="category"
        rules={[
          {
            required: true,
            message: 'Kategori belum di isi',
          },
        ]}
      >
        <Select placeholder="--Kategori Produk--" size="large">
          {/* {CategoryData.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))} */}
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
        ]}
      >
        <InputNumber
          placeholder="Masukkan harga jual produk"
          size="large"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        label="Gambar"
        name="image"
        // rules={validateUpload()}
      >
        <Upload
          accept="image/png, image/jpeg, image/jpg"
          style={{ width: '100%' }}
          name="foto"
          listType="picture-card"
          className="avatar-uploader"
          // customRequest={handleRequest}
          showUploadList={false}
          // beforeUpload={beforeUpload}
          // onChange={handleChange}
        >
          {/* {imageUrl ? (
            <Image src={imageUrl} alt="image" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )} */}
          {uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Tambah
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormTambahProduk;
