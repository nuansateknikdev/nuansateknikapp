import { Button, Checkbox, Form, Input } from 'antd'
import styles from './signin.module.css'
import { useAuth } from '../../../context/AuthUserContext'
import { useMediaQuery } from 'react-responsive'

const SigninMain = () => {
  const { signInAuth } = useAuth()
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)',
  })

  const onFinish = (values) => {
    signInAuth(values.email, values.password)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div id="signin-page" className={styles.signin}>
      {isDesktop && <div className={styles.hero}></div>}
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
