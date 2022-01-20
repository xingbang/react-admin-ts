import React from 'react';
import { PageHeader, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import ActionList from './ActionList';
import UserList from './ActionList';

const { TabPane } = Tabs;

const RoleDetail: React.FC = () => {
  const dispatch = useDispatch();
  // 取值
  const { rowData } = useSelector((state: RootState) => state.role);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title={rowData.name}
        footer={
          <Tabs defaultActiveKey="actionList">
            <TabPane tab="策略列表" key="actionList">
              <ActionList />
            </TabPane>
            <TabPane tab="用户列表" key="userList">
              <UserList />
            </TabPane>
          </Tabs>
        }
      />
      ,
    </>
  );
};

export default RoleDetail;
