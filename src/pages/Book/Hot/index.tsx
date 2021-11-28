import React, { useContext, useReducer } from 'react';
import { message, Button, Modal } from 'antd';
import { getBootHot, deleteHotBook } from '@src/service/api/book';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Context } from '@src/store/CustomProvider';
import type { ProColumns } from '@ant-design/pro-table';
import { useAsync } from '@src/utils/useAsync';
import ProTable from '@ant-design/pro-table';
import { TableListItem } from '@src/typing/Book';
import AddModal from './components/AddModal';

const List: React.FC = (props: any) => {

  const { _state, _dispatch } = useContext(Context);
  const { isModalVisible } = _state;
  const { run, isSuccess, data: list } = useAsync<any>();

  // add
  const handleAdd = () => {
    _dispatch({
      isModalVisible: true
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
          if (res.error_code === 0) {
            // success
            message.success(res.msg);
            _dispatch({
              type: 'refresh'
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
      params={{ onRefresh: _state.onRefresh }}
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
    {isModalVisible ? <AddModal /> : ''}
  </div>)
};

export default List;
