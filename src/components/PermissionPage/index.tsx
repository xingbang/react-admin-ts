import React from 'react';
import NoAuto from '@src/pages/Exception/403';

interface IPermissionPageProps {
  permissionList: any[];
  permission: string;
}

const PermissionPage: React.FC<IPermissionPageProps> = (props) => {
  let isPermission: boolean = false;
  props.permissionList.forEach((per: any) => {
    if (per.permission === props.permission) {
      isPermission = true;
    }
  });
  return <React.Fragment>{isPermission ? props.children : <NoAuto />}</React.Fragment>;
};

export default PermissionPage;
