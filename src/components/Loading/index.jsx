import { Spin } from 'antd'
import React from 'react'
const Loading = ({ children, loading }) => {
  return <Spin spinning={loading}>{children}</Spin>
}

export default Loading
