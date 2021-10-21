import { GlobalState, GlobalDispatch } from '@src/store/GlobalProvider';
import { CustomState, CustomDispatch } from '@src/store/CustomProvider';

declare namespace GlobalType {
  interface GState extends GlobalState {}
  interface GDispatch extends GlobalDispatch {}
  interface CState extends CustomState {}
  interface CDispatch extends CustomDispatch {}
}

// commonjs, amd, 由于两者不兼容，所以就有了export= 将两者统一，以至于让TS支持
export = GlobalType;

// UMD module, 表示将某个命名空间挂载到全局命名空间上，从而可以通过全局变量形式使用
export as namespace GlobalType;
