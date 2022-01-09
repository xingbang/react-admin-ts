import React, { useState, useContext } from 'react';
import { Modal } from 'antd';
import { Context } from '@src/contextStore/GlobalProvider';
import { withRouter } from 'react-router-dom';

const OnLogin: React.FC = (props: any) => {
  const { g_state } = useContext(Context);

  const [isModalVisible, setIsModalVisible] = useState(!g_state.onLogin);

  const handleOk = () => {
    setIsModalVisible(false);
    props.history.push('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal title="登录提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>登录状态失效，请重新登录！！</p>
    </Modal>
  );
};

// https://github.com/brickspert/blog/issues/3
// withRouter高阶组件，提供了history让你使用~
export default withRouter(OnLogin);
