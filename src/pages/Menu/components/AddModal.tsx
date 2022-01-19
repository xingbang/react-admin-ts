import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { handleClose, handlePutClose, createMenu, putMenu } from '@src/store/slice/menu.slice';

const AddModal: React.FC = () => {
  const dispatch = useDispatch();
  // 取值
  const { addModal, loading, isPut, rowData } = useSelector((state: RootState) => state.menu);
  const [form] = Form.useForm();

  // cancel
  const handleCancel = () => {
    dispatch(handleClose());
  };

  // onok
  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(createMenu(values));
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
      dispatch(putMenu(data));
    });
  };

  return (
    <Modal
      title={isPut ? '修改菜单' : '新增菜单'}
      visible={addModal}
      onOk={isPut ? handlePutOk : handleOk}
      onCancel={isPut ? handlePutCancel : handleCancel}
      confirmLoading={loading}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
        <Form.Item label="菜单名称" name="name" rules={[{ required: true }]} initialValue={isPut ? rowData.name : ''}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item label="父级菜单" name="father_id" initialValue={isPut ? rowData.father_id : ''}>
          <Input placeholder="请输入父级菜单" />
        </Form.Item>
        <Form.Item label="url" name="url" rules={[{ required: true }]} initialValue={isPut ? rowData.url : ''}>
          <Input placeholder="请输入url" />
        </Form.Item>
        <Form.Item label="图标名称" name="icon_name" initialValue={isPut ? rowData.icon_name : ''}>
          <Input placeholder="请输入图标名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
