const fileModule = {
  namespaced: true,
  state() {
    return {
      onUpdateListFn: null,
    };
  },
  mutations: {},
  actions: {
    onUpdateList({ state }: any, cb: any) {
      state.onUpdateListFn = cb;
    },
    updateList({ state }: any, params: any) {
      if (state.onUpdateListFn && typeof state.onUpdateListFn === 'function') state.onUpdateListFn(params);
    },
  },
};
export default fileModule;
