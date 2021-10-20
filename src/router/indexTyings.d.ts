interface childrenType {
  name: string;
  path: string;
  component?: any;
  isHide?: boolean;
  children?: childrenType[];
}

export interface routerConfigType {
  name: string;
  path: string;
  children: childrenType[];
}
