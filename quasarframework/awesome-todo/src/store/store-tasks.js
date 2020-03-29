import Vue from 'vue';
import { uid } from 'quasar'

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
  },
  search: ''
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, value) {
    state.search = value;
  }
}

const actions = {
  updateTask({ commit }, payload) {
    commit('updateTask', payload);
  },
  deleteTask({ commit }, id){
    commit('deleteTask', id);
  },
  addTask({ commit }, task) {
    let id = uid();
    let payload = {
      id: id,
      task: task
    }
    commit('addTask', payload);
  },
  setSearch({ commit }, value) {
    commit('setSearch', value);
  }
}

const getters = {
  tasksFiltered: (state) => {
    if(state.search) {
      let tasksFiltered = {};
      Object.keys(state.tasks).forEach(key => {
        let task = state.tasks[key];
        let taskNameLowerCase = task.name.toLowerCase();
        let searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return state.tasks;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
