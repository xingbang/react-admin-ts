import { useEffect, useRef } from 'react';

export const getSession = (tokenKey: string) => {
  return sessionStorage.getItem(tokenKey);
};

export const setSession = (tokenKey: string, token: string) => {
  sessionStorage.setItem(tokenKey, token);
};

export const removeSession = (tokenKey: string) => {
  sessionStorage.removeItem(tokenKey);
};

/**
 * 返回组建在挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
