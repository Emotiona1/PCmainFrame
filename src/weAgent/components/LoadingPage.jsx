import React from 'react';
import { Spin } from 'antd';

function LoadingPage() {
  return (
    <div className="weAgent weAgent__loading">
      <Spin size="large" tip="正在加载助手，请稍候..." />
    </div>
  );
}

export default LoadingPage;
