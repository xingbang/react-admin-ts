import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoleListApi, createRoleApi, delRoleApi, putRoleApi } from '@src/service/api/role';
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

// 获取用户组列表
export const getRoleList = createAsyncThunk('role/getRoleList', async (params: any) => {
  return await getRoleListApi(params);
});

// 创建用户组
export const createRole = createAsyncThunk('role/createRole', async (params: any) => {
  return await createRoleApi(params);
});

// 删除用户组
export const delRole = createAsyncThunk('role/delRole', async (params: any) => {
  return await delRoleApi(params);
});

// 更新用户组
export const putRole = createAsyncThunk('role/putRole', async (params: any) => {
  return await putRoleApi(params);
});

// 创建切片
export const roleSlice = createSlice({
  name: 'role',
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
    [createRole.pending.type]: (state) => {
      state.loading = true;
    },
    [createRole.fulfilled.type]: (state, action) => {
      const { error_code, data, msg } = action.payload;
      if (error_code === 0) {
        state.addModal = false;
        state.onRefresh = Math.random();
        message.success(msg);
      } else {
        message.success(msg);
      }
      state.loading = false;
    },
    [createRole.rejected.type]: (state, action) => {
      state.loading = false;
    },
    // del
    [delRole.pending.type]: (state) => {
      state.buttonLoading = true;
    },
    [delRole.fulfilled.type]: (state, action) => {
      const { error_code, data, msg } = action.payload;
      if (error_code === 0) {
        state.addModal = false;
        state.onRefresh = Math.random();
        message.success(msg);
      } else {
        message.success(msg);
      }
      state.buttonLoading = false;
    },
    [delRole.rejected.type]: (state, action) => {
      state.buttonLoading = false;
    },
    // put
    [putRole.pending.type]: (state) => {
      state.buttonLoading = true;
    },
    [putRole.fulfilled.type]: (state, action) => {
      const { error_code, data, msg } = action.payload;
      if (error_code === 0) {
        state.addModal = false;
        state.onRefresh = Math.random();
        message.success(msg);
      } else {
        message.success(msg);
      }
      state.buttonLoading = false;
    },
    [putRole.rejected.type]: (state, action) => {
      state.buttonLoading = false;
    }
  }
});

export const { handleAdd, handleClose, handlePut, handlePutClose } = roleSlice.actions;

// export const selectLoading = (state: RootState) => state.user.loading;
