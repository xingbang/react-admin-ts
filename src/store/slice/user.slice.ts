import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserListApi, createUserApi } from '@src/service/api/user';
import { message } from 'antd';
// import { RootState } from '..';

export interface UserState {
  loading: boolean;
  addModal: boolean;
  onRefresh: number;
}

const initialState: UserState = {
  loading: false,
  addModal: false,
  onRefresh: 0
};

// 获取用户列表
export const getUserList = createAsyncThunk('user/getUserList', async (params: any) => {
  return await getUserListApi(params);
});

// 创建用户
export const createUser = createAsyncThunk('user/createUser', async (params: any) => {
  return await createUserApi(params);
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
    }
  },
  // extraReducers
  extraReducers: {
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
    }
    // [getUserList.pending.type]: (state) => {
    //   state.loading = true;
    // },
    // [getUserList.fulfilled.type]: (state, action) => {
    //   const { error_code, data, msg } = action.payload;
    //   if (error_code === 0) {
    //     state.userList = data;
    //   } else {
    //     state.errorMsg = msg;
    //   }
    //   state.loading = false;
    // },
    // [getUserList.rejected.type]: (state, action) => {
    //   state.loading = false;
    // }
  }
});

export const { handleAdd, handleClose } = userSlice.actions;

// export const selectLoading = (state: RootState) => state.user.loading;
