import { CustomState, CustomAction, initialState } from './CustomProvider';

export const actionLog = (state: CustomState, action: CustomAction) => {
  const D = new Date();
  const date = `${D.getHours()}:${D.getMinutes()}:${D.getSeconds()}:${D.getMilliseconds()}`;
  console.groupCollapsed('ACTION', action.type, date);
  console.log('type         ', 'color:#528b8b', action.type);
  console.log('payload      ', 'color:#0000cd', action.payload);
  console.log('state        ', 'color:#76ee00', { ...state, ...action.payload });
  console.log('initialState ', 'color:#ff0000', { ...initialState, ...action.payload });
  console.groupEnd();
};
