import React, { useContext } from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Context } from '@src/contextStore/GlobalProvider';
import { getToken } from '@src/service/api/user';
import { setSession } from '@src/utils';

import './index.less';

const Login: React.FC = (props: any) => {
  const { g_state, g_dispatch } = useContext(Context);

  // 登录
  const onFinish = (value: any) => {
    const { account, secret } = value;
    getToken({ type: 101, account, secret }).then((data: any) => {
      setSession('TOKEN', data.token);
      setSession('USERNAME', account);
      // 查询权限菜单
      let permissionList: any[] = [
        {
          id: 1000,
          permission: 'user',
          type: 1
        },
        {
          id: 2000,
          permission: 'book',
          type: 1
        },
        {
          id: 3000,
          permission: 'three',
          type: 1
        }
      ];

      let menuMarkMap: any = {};
      let buttonMap: any = {};
      permissionList.forEach((item) => {
        if (item.type === 1) {
          menuMarkMap[item.permission] = item.id;
        } else {
          buttonMap[item.permission] = item.id;
        }
      });
      const permission = {
        menuMarkMap: menuMarkMap,
        buttonMap: buttonMap
      };
      // 菜单写进session
      setSession('MENU', JSON.stringify(permission));
      g_dispatch({ type: 'update', payload: { Menu: permission } });
      props.history.push('/user/list');
    });
  };

  return (
    <Layout>
      <div className="login">
        <div className="login-container">
          <div className="login-header">管理系统</div>
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: '用户名不能为空'
                }
              ]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="secret"
              rules={[
                {
                  required: true,
                  message: '密码不能为空'
                }
              ]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox style={{ color: '#fff' }}>记住我</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
