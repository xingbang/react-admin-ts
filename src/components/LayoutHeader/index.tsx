import React, { useContext } from 'react';
import { Layout, Breadcrumb, Dropdown, Avatar, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LoginOutlined, HomeOutlined } from '@ant-design/icons';
import { Context } from '@src/store/CustomProvider';
import { removeSession } from '@src/utils';
import { withRouter } from "react-router-dom";
import menuData from '@src/router/router';
import styles from './index.less';

const { Header } = Layout;
const MenuItem = Menu.Item;

const LayoutHeader: React.FC = (props: any) => {
  const { _dispatch, _state } = useContext(Context);
  const logout = () => {
    removeSession('TOKEN');
    removeSession('USERNAME');
    props.history.push('/login');
  }

  const menu = (
    <Menu>
      {/* <Menu.Divider /> */}
      <MenuItem key="lagout">
        <div onClick={logout}> <LoginOutlined />  退出登录</div>
      </MenuItem>
    </Menu>
  );

  const changeCollapsed = () => {
    _dispatch({
      isCollapsed: !_state.isCollapsed
    })
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
      <div className={styles.layoutColl}>
        <span onClick={changeCollapsed}>
          {
            _state.isCollapsed ? <MenuUnfoldOutlined style={{ fontSize: 24 }} /> : <MenuFoldOutlined style={{ fontSize: 24 }} />
          }
        </span>
        <ul className={styles.rightMenu}>
          <Dropdown overlay={menu}>
            <li className={styles.menuItem}>
              <Avatar icon={<UserOutlined />} />
              <span className={styles.username}></span>
            </li>
          </Dropdown>
        </ul>
      </div>
    </Header>
    <Breadcrumb className={styles.layoutBread} >
      <Breadcrumb.Item href="/"><HomeOutlined /></Breadcrumb.Item>
      {
        getBreadcrumbList().map((item: any) => (
          <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  </>)
}

export default withRouter(LayoutHeader);