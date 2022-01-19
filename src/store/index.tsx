import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slice/user.slice';
import { roleSlice } from './slice/role.slice';
import { menuSlice } from './slice/menu.slice';

// 合并多个reducer
export const rootReducer = combineReducers({
  user: userSlice.reducer,
  role: roleSlice.reducer,
  menu: menuSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
// 获取全部store数据类型
export type RootState = ReturnType<typeof store.getState>;
