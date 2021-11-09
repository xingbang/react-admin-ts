declare interface Window {
  _store: {
    _state: GlobalType.CState;
    _dispatch: GlobalType.CDispatch;
  };
  g_store: {
    g_state: GlobalType.GState;
    g_dispatch: GlobalType.GDispatch;
  };
}

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
