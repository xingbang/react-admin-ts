import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { handleClose, handlePutClose, createRole, putRole } from '@src/store/slice/role.slice';

const AddModal: React.FC = () => {
  const dispatch = useDispatch();
  // 取值
  const { addModal, loading, isPut, rowData } = useSelector((state: RootState) => state.role);
  const [form] = Form.useForm();

  // cancel
  const handleCancel = () => {
    dispatch(handleClose());
  };

  // onok
  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(createRole(values));
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
      dispatch(putRole(data));
    });
  };

  return (
    <Modal
      title={isPut ? '修改角色' : '新增角色'}
      visible={addModal}
      onOk={isPut ? handlePutOk : handleOk}
      onCancel={isPut ? handlePutCancel : handleCancel}
      confirmLoading={loading}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
        <Form.Item label="角色名称" name="name" rules={[{ required: true }]} initialValue={isPut ? rowData.name : ''}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item label="角色描述" name="describe" rules={[{ required: true }]} initialValue={isPut ? rowData.describe : ''}>
          <Input placeholder="请输入角色描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
