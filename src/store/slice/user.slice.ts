import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserListApi, createUserApi, delUserApi, putUserApi } from '@src/service/api/user';
import { message } from 'antd';
// import { RootState } from '..';

export interface UserState {
  loading: boolean;
  buttonLoading: boolean;
  addModal: boolean;
  onRefresh: number;
  isPut: boolean;
  rowData: any;
}

const initialState: UserState = {
  loading: false,
  buttonLoading: false,
  addModal: false,
  onRefresh: 0,
  isPut: false,
  rowData: {}
};

// 获取用户列表
export const getUserList = createAsyncThunk('user/getUserList', async (params: any) => {
  return await getUserListApi(params);
});

// 创建用户
export const createUser = createAsyncThunk('user/createUser', async (params: any) => {
  return await createUserApi(params);
});

// 删除用户
export const delUser = createAsyncThunk('user/delUser', async (params: any) => {
  return await delUserApi(params);
});

// 更新用户
export const putUser = createAsyncThunk('user/putUser', async (params: any) => {
  return await putUserApi(params);
});

// 创建切片
export const userSlice = createSlice({
  name: 'user',
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
    [createUser.pending.type]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled.type]: (state, action) => {
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
    [createUser.rejected.type]: (state, action) => {
      state.loading = false;
    },
    // del
    [delUser.pending.type]: (state) => {
      state.buttonLoading = true;
    },
    [delUser.fulfilled.type]: (state, action) => {
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
    [delUser.rejected.type]: (state, action) => {
      state.buttonLoading = false;
    },
    // put
    [putUser.pending.type]: (state) => {
      state.buttonLoading = true;
    },
    [putUser.fulfilled.type]: (state, action) => {
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
    [putUser.rejected.type]: (state, action) => {
      state.buttonLoading = false;
    }
  }
});

export const { handleAdd, handleClose, handlePut, handlePutClose } = userSlice.actions;

// export const selectLoading = (state: RootState) => state.user.loading;
