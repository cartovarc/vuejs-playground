import Vue from 'vue';

const state = {
  tasks: {
    "ID1": {
      name: 'Get chicharron',
      completed: false,
      dueDate: '2020/03/27',
      dueTime: '15:30'
    },
    "ID2": {
      name: 'Get bananas',
      completed: true,
      dueDate: '2020/03/28',
      dueTime: '16:30'
    },
    "ID3": {
      name: 'Get apples',
      completed: false,
      dueDate: '2020/03/29',
      dueTime: '17:30'
    }
  }
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id){
    Vue.delete(state.tasks, id);
  }
}

const actions = {
  updateTask({ commit }, payload) {
    commit('updateTask', payload);
  },
  deleteTask({ commit }, id){
    commit('deleteTask', id);
  }
}

const getters = {
  tasks: (state) => {
    return state.tasks;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
