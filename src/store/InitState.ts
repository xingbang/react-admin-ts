import BookInitState from './state/book';

export class GlobalState {
  onLoding = false; // loading
  onRefresh = 0; // 手动刷新
  isCollapsed = false; // 侧边栏是否隐藏
}

const State = {
  ...new GlobalState(), // 全局state
  ...new BookInitState() // 书籍state
};

export default State;
