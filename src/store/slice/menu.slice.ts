import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMenuistApi, createMenuApi, delMenuApi, putMenuApi } from '@src/service/api/menu';
import { message } from 'antd';
// import { RootState } from '..';

export interface RoleState {
  loading: boolean;
  buttonLoading: boolean;
  addModal: boolean;
  onRefresh: number;
  isPut: boolean;
  rowData: any;
}

const initialState: RoleState = {
  loading: false,
  buttonLoading: false,
  addModal: false,
  onRefresh: 0,
  isPut: false,
  rowData: {}
};

// 获取菜单列表
export const getMenuList = createAsyncThunk('menu/getMenuList', async (params: any) => {
  return await getMenuistApi(params);
});

// 创建菜单
export const createMenu = createAsyncThunk('menu/createMenu', async (params: any) => {
  return await createMenuApi(params);
});

// 删除菜单
export const delMenu = createAsyncThunk('menu/delMenu', async (params: any) => {
  return await delMenuApi(params);
});

// 更新菜单
export const putMenu = createAsyncThunk('menu/putMenu', async (params: any) => {
  return await putMenuApi(params);
});

// 创建切片
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // 新增弹窗
    handleAdd: (state) => {
      state.addModal = true;
    },
    // 关闭弹窗
    handleClose: (state) => {
      state.addModal = false;
    },
    // 新增弹窗-更新
    handlePut: (state, action) => {
      state.addModal = true;
      state.isPut = true;
      state.rowData = action.payload;
    },
    // 关闭弹窗-更新
    handlePutClose: (state) => {
      state.addModal = false;
      state.isPut = false;
      state.rowData = {};
    }
  },
  // extraReducers
  extraReducers: {
    // create
    [createMenu.pending.type]: (state) => {
      state.loading = true;
    },
    [createMenu.fulfilled.type]: (state, action) => {
      const { error_code, data, msg } = action.payload;
      if (error_code === 0) {
        state.addModal = false;
        state.onRefresh = Math.random();
        message.success(msg);
      }
      state.loading = false;
    },
    [createMenu.rejected.type]: (state, action) => {
      state.loading = false;
    },
    // del
    [delMenu.pending.type]: (state) => {
      state.buttonLoading = true;
    },
    [delMenu.fulfilled.type]: (state, action) => {
      const { error_code, data, msg } = action.payload;
      if (error_code === 0) {
        state.addModal = false;
        state.onRefresh = Math.random();
        message.success(msg);
      }
      state.buttonLoading = false;
    },
    [delMenu.rejected.type]: (state, action) => {
      state.buttonLoading = false;
    },
    // put
    [putMenu.pending.type]: (state) => {
      state.buttonLoading = true;
    },
    [putMenu.fulfilled.type]: (state, action) => {
      const { error_code, data, msg } = action.payload;
      if (error_code === 0) {
        state.addModal = false;
        state.onRefresh = Math.random();
        message.success(msg);
      }
      state.buttonLoading = false;
    },
    [putMenu.rejected.type]: (state, action) => {
      state.buttonLoading = false;
    }
  }
});

export const { handleAdd, handleClose, handlePut, handlePutClose } = menuSlice.actions;

// export const selectLoading = (state: RootState) => state.user.loading;
