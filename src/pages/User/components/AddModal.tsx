import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { handleClose, createUser } from '@src/store/slice/user.slice';

const AddModal: React.FC = () => {
  const dispatch = useDispatch();
  // 取值
  const { addModal, loading } = useSelector((state: RootState) => state.user);
  const [form] = Form.useForm();

  // cancel
  const handleCancel = () => {
    dispatch(handleClose());
  };

  // onok
  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(createUser(values));
    });
  };
  return (
    <Modal title="新增用户" visible={addModal} onOk={handleOk} onCancel={handleCancel} confirmLoading={loading}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
        <Form.Item label="用户名称" name="nickname" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item label="用户邮箱" name="email" rules={[{ required: true }]}>
          <Input placeholder="请输入用户邮箱" />
        </Form.Item>
        <Form.Item label="密码" name="password1" rules={[{ required: true }]}>
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
        <Form.Item label="确认密码" name="password2" rules={[{ required: true }]}>
          <Input placeholder="请在此输入密码" type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
