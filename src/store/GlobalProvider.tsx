import React, { createContext, useReducer } from 'react';

class InitState {
  onLoginFailure = false; // 登录状态 true | false
}

const initialState = new InitState();
export type GlobalState = typeof initialState;
type DeepPartial<T> = T extends Function ? T : T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
type ActionType = 'update';
export type GlobalAction = { type?: ActionType; payload?: DeepPartial<GlobalState> };
export type GlobalDispatch = React.Dispatch<GlobalAction>;
export type GlobalReducer = React.Reducer<GlobalState, GlobalAction>;

const reducer: GlobalReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const Idispatch: GlobalDispatch = () => {};

export const Context: React.Context<{
  g_state: GlobalState;
  g_dispatch: GlobalDispatch;
}> = createContext({ g_state: initialState, g_dispatch: Idispatch });

export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<GlobalReducer>(reducer, initialState);
  sessionStorage.setItem('g_redux', JSON.stringify(state));

  window.g_store = {
    g_state: state,
    g_dispatch: dispatch
  };
  return <Context.Provider value={{ g_state: state, g_dispatch: dispatch }}>{children}</Context.Provider>;
};
