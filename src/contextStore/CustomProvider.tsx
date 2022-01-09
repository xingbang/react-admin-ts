import React, { createContext, useReducer } from 'react';
import InitState from '@src/contextStore/InitState';
import reducer from './reducer';

export const initialState = InitState;
export type CustomState = typeof initialState;
type DeepPartial<T> = T extends Function ? T : T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
type ActionType = 'update' | 'refresh' | 'reset' | 'onSpin' | 'unSpin';
export type CustomAction = { type?: ActionType; payload?: DeepPartial<CustomState> } | { [key: string]: any };
export type CustomDispatch = React.Dispatch<CustomAction>;
export type CustomReducer = React.Reducer<CustomState, CustomAction>;

const Idispatch: CustomDispatch = () => {};

export const Context: React.Context<{
  _state: CustomState;
  _dispatch: CustomDispatch;
}> = createContext({ _state: initialState, _dispatch: Idispatch });

export const CustomProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<CustomReducer>(reducer, initialState);
  sessionStorage.setItem('_redux', JSON.stringify(state));

  window._store = {
    _state: state,
    _dispatch: dispatch
  };
  return <Context.Provider value={{ _state: state, _dispatch: dispatch }}>{props.children}</Context.Provider>;
};
