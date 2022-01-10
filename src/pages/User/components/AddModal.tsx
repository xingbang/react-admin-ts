import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { handleClose, handlePutClose, createUser, putUser } from '@src/store/slice/user.slice';

const AddModal: React.FC = () => {
  const dispatch = useDispatch();
  // 取值
  const { addModal, loading, isPut, rowData } = useSelector((state: RootState) => state.user);
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

  // cancel
  const handlePutCancel = () => {
    dispatch(handlePutClose());
  };

  // put onok
  const handlePutOk = () => {
    form.validateFields().then((values) => {
      const data = { ...values, id: rowData.id };
      dispatch(putUser(data));
    });
  };

  return (
    <Modal
      title={isPut ? '修改用户' : '新增用户'}
      visible={addModal}
      onOk={isPut ? handlePutOk : handleOk}
      onCancel={isPut ? handlePutCancel : handleCancel}
      confirmLoading={loading}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
        <Form.Item label="用户名称" name="nickname" rules={[{ required: true }]} initialValue={isPut ? rowData.nickname : ''}>
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item label="用户邮箱" name="email" rules={[{ required: true }]} initialValue={isPut ? rowData.email : ''}>
          <Input placeholder="请输入用户邮箱" />
        </Form.Item>
        {!isPut ? (
          <>
            <Form.Item label="密码" name="password1" rules={[{ required: true }]}>
              <Input placeholder="请输入密码" type="password" />
            </Form.Item>
            <Form.Item label="确认密码" name="password2" rules={[{ required: true }]}>
              <Input placeholder="请在此输入密码" type="password" />
            </Form.Item>
          </>
        ) : (
          ''
        )}
      </Form>
    </Modal>
  );
};

export default AddModal;
