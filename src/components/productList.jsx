import React, { useState, useEffect } from 'react';
import { Upload, Button, Input, notification, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';


const ProductList = ()=>{
    const [loader, setLoader] = useState(false);
    const [fieldData, setFieldData] = useState({ name: '', description: '' });
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const navigate = useNavigate();
    const [state, setState] = useState({
      loader: false,
      error: false,
      message: '',
    });

    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
          onSuccess('ok');
        }, 0);
      };
    const sendData = ()=>{
        
    }

    return (
        <div className='w-[100%] h-[80vh] flex items-start justify-center mt-8'>
      <div className='w-[50%] p-8 bg-white rounded-lg shadow-lg text-center'>
        <h1 className='text-3xl font-bold mt-4'>Add Category</h1>
        <p className='text-lg mt-2'>Please add category in home service</p>
        <Form className='space-y-4 mt-6' onFinish={sendData}>
          <Form.Item
            name='categoryImage'
            rules={[
              {
                required: true,
                message: 'Please select an image for the category',
              },
            ]}
          >
            <Upload
              accept='image/*'
              showUploadList={false}
              customRequest={dummyRequest}
              listType='picture-card'
              onChange={(event) => {
                setFile(event.file.originFileObj);
                getBase64(event.file.originFileObj)
                  .then((data) => setUrl(data))
                  .catch((e) => console.log(e));
              }}
              name='file'
            >
              {url ? (
                <img src={url} alt='avatar' className='w-full' />
              ) : (
                <div>
                  <PlusOutlined />
                  <div className='mt-2 text-sm'>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name='categoryName'
            rules={[
              {
                required: true,
                message: 'Please enter the category name',
              },
            ]}
          >
            <Input
              value={fieldData.name}
              onChange={(e) =>
                setFieldData({ ...fieldData, name: e.target.value })
              }
              placeholder='Category Name'
            />
          </Form.Item>
          <Form.Item name='categoryDescription'>
            <Input.TextArea
              value={fieldData.description}
              onChange={(e) =>
                setFieldData({
                  ...fieldData,
                  description: e.target.value,
                })
              }
              placeholder='Category Description'
            />
          </Form.Item>
          <Button
            htmlType='submit'
            type='primary'
            size='large'
            block
            loading={loader}
            className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
          >
            {loader ? 'Adding Category...' : 'Add Category'}
          </Button>
        </Form>
        {state.error && (
          <div className='text-red-500 mt-4'>{state.message}</div>
        )}
        <p className='text-lg mt-8'>
          Find existing category?
          <Link className='text-blue-400' to='/allCategories'>
            All Category
          </Link>
        </p>
      </div>
    </div>
    )
}

export default ProductList