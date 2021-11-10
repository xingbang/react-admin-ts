import React from 'react';
import NoAuto from '@src/pages/Exception/403';

interface IPermissionPageProps {
  isPermission: boolean;
}

const PermissionPage: React.FC<IPermissionPageProps> = (props) => {
  return <React.Fragment>{!props.isPermission ? props.children : <NoAuto />}</React.Fragment>;
};

export default PermissionPage;
