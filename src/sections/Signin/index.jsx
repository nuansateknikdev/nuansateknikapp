import { Button, Checkbox, Form, Input } from 'antd'
import styles from './signin.module.css'
import { useAuth } from '../../../context/AuthUserContext'

const SigninMain = () => {
  const { signInAuth } = useAuth()

  const onFinish = (values) => {
    console.log('Success:', values)
    signInAuth(values.email, values.password)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div id="signin-page" className={styles.signin}>
      <div className={styles.hero}></div>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.title}>
            <h1>Login</h1>
            <p>Masuk untuk mengakses akun anda.</p>
          </div>
          <Form
            name="signinform"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your emai!',
                  type: 'email',
                },
              ]}>
              <Input placeholder="nama@email.com" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}>
              <Input.Password placeholder="masukkan kata sandi" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Masuk
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SigninMain
