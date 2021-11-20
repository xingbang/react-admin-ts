import React, { useEffect, useReducer } from 'react';
import { message, Table, Button, Modal, Form, Input } from 'antd';
import { getBootHot, creatHotBook, deleteHotBook } from '@src/service/api/book';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { useAsync } from '@src/utils/useAsync';


export type TableListItem = {
  id: number;
  author: string;
  title: string;
  count: number;
  image: string;
  index: number;
  status: number;
};

const List: React.FC = (props: any) => {

  const initState = {
    isQuery: '',
    isModalVisible: false,
    selectData: [],
    listQuery: {
      page: 1,   // 当前页数
      limit: 10,  // 每页条数
    },
    temp: {
      id: '',
      index: '',
      title: '',
      author: '',
      image: ''
    }
  }
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'success':
        return {
          ...state,
          ...action.payload
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initState)

  const { isQuery, listQuery, isModalVisible } = state

  const [form] = Form.useForm();

  const { run, isSuccess, data: list } = useAsync<any>();

  // useEffect(() => {
  //   console.log(listQuery)
  //   run(getBootHot(listQuery))
  // }, [listQuery.page, listQuery.limit, isQuery])
  console.log(isSuccess, 'params===')
  // add
  const handleAdd = () => {
    dispatch({
      type: 'success',
      payload: {
        isModalVisible: true
      }
    })
  }

  const handleCancel = () => {
    dispatch({
      type: 'success',
      payload: {
        isModalVisible: false
      }
    })
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      creatHotBook(values).then((res: any) => {
        if (res.data.error_code === 0) {
          // success
          message.success(res.data.msg);
          dispatch({
            type: 'success',
            payload: {
              isModalVisible: false
            }
          })
        }
      })
    })
  }

  // 分页change
  const onChange = (page: number, pageSize?: number) => {
    dispatch({
      type: 'success',
      payload: {
        listQuery: {
          page: page,    // 当前页数
          limit: pageSize,  // 每页数据
        }
      }
    })

  }

  const deleteRow = (index: number): void => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除这条数据？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteHotBook(index).then((res: any) => {
          if (res.data.error_code === 0) {
            // success
            message.success(res.data.msg);
            dispatch({
              type: 'success',
              payload: {
                isQuery: res.request
              }
            })
          }
        })
      },
    });
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '图书序号',
      dataIndex: 'id',
      width: 200
    },
    {
      title: '书名',
      dataIndex: 'title',
      width: 200
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 200
    },
    {
      title: '点赞数',
      dataIndex: 'count'
    },
    {
      title: '封面',
      dataIndex: 'image',
      render: (_: any, render: any) => {
        return (
          <>
            <img alt='' src={render.image} style={{ width: '40px' }} />
          </>
        )
      }

    },
    {
      title: '操作',
      dataIndex: 'opeartion',
      render: (_: any, render: any) => {
        return (
          <>
            <Button type="link" onClick={() => { deleteRow(render.index) }}>删除</Button>
          </>
        )
      }

    }
  ]

  return (<div style={{ margin: '-24px' }}>
    <ProTable<TableListItem>
      rowKey="id"
      columns={columns}
      pagination={{
        showQuickJumper: true
      }}
      request={async (
        params
      ) => {
        const msg = await run(getBootHot({ limit: params.pageSize, page: params.current }));
        return {
          data: msg.data.result,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          // success: true,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: msg.data.meta.total,
        }

      }}
      search={false}
      dateFormatter="string"
      headerTitle="热门书籍"
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={handleAdd}>
          新增
        </Button>,
      ]}
    />
    <Modal title="新增图书" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        form={form}
      >
        <Form.Item
          label="图书id"
          name="id"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入图书id" />
        </Form.Item>
        <Form.Item
          label="图书名称"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入图书名称" />
        </Form.Item>
        <Form.Item
          label="图书作者"
          name="author"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入图书作者" />
        </Form.Item>
        <Form.Item
          label="缩略图"
          name="image"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入封面url" />
        </Form.Item>
      </Form>
    </Modal>

  </div>)
};

export default List;
