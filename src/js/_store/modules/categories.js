import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    category: '',
    categoryList: [],
    deleteCategoryId: null,
    deleteCategoryName: '',
  },
  getters: {
    targetCategory: state => state.category,
    deleteCategoryId: state => state.deleteCategoryId,
  },
  mutations: {
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories;
      state.loading = false;
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    udpateValue(state, categoryName) {
      state.category = categoryName;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    resetDeleteCategoryId(state) {
      state.deleteCategoryId = null;
    },
    resetDeleteCategoryName(state) {
      state.deleteCategoryName = '';
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', { categories });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    udpateValue({ commit }, categoryName) {
      commit('udpateValue', categoryName);
    },
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory']);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }) {
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/deleteCategoryId']);
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        data,
      }).then(() => {
        commit('resetDeleteCategoryId');
        commit('resetDeleteCategoryName');
        commit('displayDoneMessage', { message: 'カテゴリを削除しました' });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
