import { actionLog } from './actionLog';
import { CustomReducer, initialState } from '@src/store/CustomProvider';

const reducer: CustomReducer = (state, action) => {
  if (!action.type) {
    action.type = 'update';
    action.payload = { ...action };
  }

  actionLog(state, action);

  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    case 'refresh':
      return { ...state, ...action.payload, onRefresh: Math.random() };
    case 'reset':
      return { ...initialState, ...action.payload, onRefresh: Math.random() };
    case 'onSpin':
      return { ...state, onSpin: true };
    case 'unSpin':
      return { ...state, onSpin: false };
    default:
      return state;
  }
};

export default reducer;
