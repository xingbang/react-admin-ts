import React from 'react';
import NoAuto from '@src/pages/Exception/403';

interface IPermissionPageProps {
  permissionList: any;
  permission: string;
}

const PermissionPage: React.FC<IPermissionPageProps> = (props) => {
  // let isPermission: boolean = false;
  // props.permissionList.forEach((per: any) => {
  //   if (per.permission === props.permission) {
  //     isPermission = true;
  //   }
  // });

  // console.log(props.permissionList.menuMarkMap, 'permission');

  return <React.Fragment>{props.permissionList.menuMarkMap[props.permission] ? props.children : <NoAuto />}</React.Fragment>;
};

export default PermissionPage;
