import React, { useContext } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { Context } from '@src/contextStore/CustomProvider';
import { creatHotBook } from '@src/service/api/book';

const AddModal: React.FC = () => {
  const { _state, _dispatch } = useContext(Context);
  const { isModalVisible } = _state;
  const [form] = Form.useForm();

  // cancel
  const handleCancel = () => {
    _dispatch({
      isModalVisible: false
    });
  };

  // onok
  const handleOk = () => {
    form.validateFields().then((values) => {
      creatHotBook(values).then((res: any) => {
        if (res.error_code === 0) {
          // success
          message.success(res.msg);
          _dispatch({
            type: 'refresh',
            payload: {
              isModalVisible: false
            }
          });
        }
      });
    });
  };
  return (
    <Modal title="新增图书" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
        <Form.Item label="图书id" name="id" rules={[{ required: true }]}>
          <Input placeholder="请输入图书id" />
        </Form.Item>
        <Form.Item label="图书名称" name="title" rules={[{ required: true }]}>
          <Input placeholder="请输入图书名称" />
        </Form.Item>
        <Form.Item label="图书作者" name="author" rules={[{ required: true }]}>
          <Input placeholder="请输入图书作者" />
        </Form.Item>
        <Form.Item label="缩略图" name="image" rules={[{ required: true }]}>
          <Input placeholder="请输入封面url" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
