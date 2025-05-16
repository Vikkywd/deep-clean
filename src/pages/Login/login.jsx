


import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Form, Divider, notification, Checkbox } from 'antd';
import { loginApi } from '../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import PublicLayout from '../Layout/PublicLayout';

const Login = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [state, setState] = useState({ loader: false, error: false });

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    setState({ ...state, loader: true });
    const datas = form.getFieldsValue();
    try {
      const result = await dispatch(loginApi(datas));
      if (result?.payload) {
        notification.success({
          message: 'Login Successfully!',
          placement: 'topRight',
        });
        navigate('/dashboard')
      } else {
        throw new Error('Something went wroung!')
      }
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        placement: 'topRight',
      });
      setState({ ...state, loader: false })
    }

  };

  return (
    <PublicLayout>
      <div className=' p-8 bg-white rounded-lg shadow-lg text-center'>
        <div className='flex align-middle justify-center items-center'>
          {/* <Logo />  */} Deep clean
        </div>
        <h1 className='text-3xl font-bold mt-4'>
          Welcome to HomeServices
        </h1>
        <p className='text-lg mt-2'>Please log into your account</p>
        <Form
          onFinish={handleSubmit}
          form={form}
          layout='vertical'
          className='space-y-4 mt-6'
        >
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please enter your email',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='Email' size='large' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Password'
              size='large'
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <div className='flex justify-between items-center'>
            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to='/forgot-password' className='text-blue-400'>
              Forgot Password?
            </Link>
          </div>
          <Button
            htmlType='submit'
            type='primary'
            size='large'
            block
            loading={state.loader}
            className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
          >
            {state.loader ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        <Divider className='mt-8'>Or login with</Divider>
        <div className='flex justify-center space-x-4'>
          <Button type='default' size='large' icon={<GoogleOutlined />}>
            Google
          </Button>
          <Button type='default' size='large' icon={<FacebookOutlined />}>
            Facebook
          </Button>Register
        </div>
        <p className='text-lg mt-8'>
          Don't Have an Account?{' '}
          <Link className='text-blue-400' to='/registration'>
            now
          </Link>
        </p>
      </div>
    </PublicLayout>

  );
}

export default Login;
