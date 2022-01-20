import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { userSlice } from './slice/user.slice';
import { roleSlice } from './slice/role.slice';
import { menuSlice } from './slice/menu.slice';
import storage from 'redux-persist/lib/storage';

// 合并多个reducer
export const rootReducer = combineReducers({
  user: userSlice.reducer,
  role: roleSlice.reducer,
  menu: menuSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
// 获取全部store数据类型
export type RootState = ReturnType<typeof store.getState>;
