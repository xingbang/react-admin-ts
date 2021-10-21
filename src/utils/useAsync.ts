// 处理异步请求状态
import { useReducer, useCallback } from 'react';
import { useMountedRef } from './index';

interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null
};

const useSafeDispatch = <T>(dispatch: (...arg: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => {
      mountedRef.current ? dispatch(...args) : void 0;
    },
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState
  });

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        status: 'success',
        error: null
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        status: 'error',
        data: null
      });
    },
    [safeDispatch]
  );

  // 触发异步函数
  const run = useCallback(
    (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型数据');
      }
      safeDispatch({ status: 'loading' });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
        });
    },
    [safeDispatch, setData, setError]
  );

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    ...state
  };
};
