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
