export class GlobalState {
  onSpin = false; // loading
  onRefresh = 0; // 手动刷新
}

const State = {
  ...new GlobalState() // 全局state
};

export default State;
