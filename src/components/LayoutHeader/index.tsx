import React, { useContext } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Context } from '@src/store/CustomProvider';
import menuData from '@src/router/router';
import styles from './index.less';

const { Header } = Layout;

const LayoutHeader = () => {
  const { _dispatch, _state } = useContext(Context);
  const changeCollapsed = () => {
    _dispatch({
      isCollapsed: !_state.isCollapsed
    })
    console.log(_state)
  };

  const getBreadcrumbList = () => {
    var arr: any[] = []
    const pathname = window.location.pathname
    function getBreadcrumb(menu: any) {
      menu.forEach((item: any) => {
        if (pathname.indexOf(item.path) > -1) {
          arr.push({
            name: item.name,
            path: item.path
          })
          if (item.children) {
            getBreadcrumb(item.children)
          }
        }
      })
    }
    getBreadcrumb(menuData);
    return arr
  };
  return (<>
    <Header className={styles.layoutHeader} >
      <div className={styles.layoutColl} onClick={changeCollapsed}>
        {
          _state.isCollapsed ? <MenuUnfoldOutlined style={{ fontSize: 24 }} /> : <MenuFoldOutlined style={{ fontSize: 24 }} />
        }
      </div>
    </Header>
    <Breadcrumb className={styles.layoutBread} >
      {
        getBreadcrumbList().map((item: any) => (
          <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  </>)
}

export default LayoutHeader;