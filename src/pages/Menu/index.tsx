import React, { useEffect } from 'react';
import { Button, Space, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuList } from '@src/store/slice/menu.slice';
import { MenuListItem } from '@src/typing/Menu';
import { RootState } from '@src/store';
import { handleAdd, handlePut, delMenu } from '@src/store/slice/menu.slice';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import AddModal from './components/AddModal';

const User: React.FC = () => {
  const dispatch = useDispatch();
  // 取值
  const { addModal, onRefresh } = useSelector((state: RootState) => state.menu);

  const deleteRow = (index: number): void => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除这条数据？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch(delMenu(index));
      }
    });
  };

  const columns: ProColumns<MenuListItem>[] = [
    {
      title: '菜单ID',
      dataIndex: 'id'
    },
    {
      title: '菜单名称',
      dataIndex: 'name'
    },
    {
      title: '父级菜单',
      dataIndex: 'father_id'
    },
    {
      title: 'url',
      dataIndex: 'url'
    },
    {
      title: '菜单icon',
      dataIndex: 'icon_name'
    },
    {
      title: '操作',
      dataIndex: 'opeartion',
      width: '100px',
      render: (_: any, render: any) => {
        return (
          <Space>
            <a
              type="link"
              onClick={() => {
                dispatch(handlePut(render));
              }}>
              修改
            </a>
            <a
              type="link"
              onClick={() => {
                deleteRow(render.id);
              }}>
              删除
            </a>
          </Space>
        );
      }
    }
  ];

  return (
    <>
      <ProTable<MenuListItem>
        rowKey="id"
        columns={columns}
        pagination={{
          showQuickJumper: true
        }}
        params={{ onRefresh: onRefresh }}
        request={async (params) => {
          const res: any = await dispatch(getMenuList({ limit: params.pageSize, page: params.current }));
          return {
            data: res.payload.data.result,
            total: res.payload.data.meta
          };
        }}
        search={false}
        dateFormatter="string"
        headerTitle="菜单管理"
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => dispatch(handleAdd())}>
            新增
          </Button>
        ]}
      />
      {addModal ? <AddModal /> : ''}
    </>
  );
};

export default User;
