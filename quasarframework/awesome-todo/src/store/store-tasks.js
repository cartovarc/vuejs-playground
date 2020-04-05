import Vue from 'vue';
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'

const state = {
  tasks: {
    // "ID1": {
    //   name: 'Get chicharron',
    //   completed: false,
    //   dueDate: '2020/03/27',
    //   dueTime: '15:30'
    // },
    // "ID2": {
    //   name: 'Get bananas',
    //   completed: true,
    //   dueDate: '2020/03/28',
    //   dueTime: '16:30'
    // },
    // "ID3": {
    //   name: 'Get apples',
    //   completed: false,
    //   dueDate: '2020/03/29',
    //   dueTime: '17:30'
    // }
  },
  search: '',
  sort: 'name',
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
  },
  setSort(state, value) {
    state.sort = value;
  }
}

const actions = {
  updateTask({ dispatch }, payload) {
    dispatch('fbUpdateTask', payload);
  },
  deleteTask({ dispatch }, id){
    dispatch('fbDeleteTask', id);
  },
  addTask({ dispatch }, task) {
    let id = uid();
    let payload = {
      id: id,
      task: task
    }
    dispatch('fbAddTask', payload);
  },
  setSearch({ commit }, value) {
    commit('setSearch', value);
  },
  setSort({ commit }, value) {
    commit('setSort', value);
  },
  fbReadData({ commit }) {
    let uid = firebaseAuth.currentUser.uid;
    let userTasks = firebaseDb.ref('tasks/' + uid);

    // child added
    userTasks.on('child_added', snapshot => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload);
    })

    // child changed
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload);
    })

    // child removed
    userTasks.on('child_removed', snapshot => {
      let taskId = snapshot.key;
      commit('deleteTask', taskId);
    })
  },
  fbAddTask({}, payload){
    let uid = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref('tasks/' + uid + '/' + payload.id);
    taskRef.set(payload.task);
  },
  fbUpdateTask({}, payload){
    let uid = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref('tasks/' + uid + '/' + payload.id);
    taskRef.update(payload.updates);
  },
  fbDeleteTask({}, taskId){
    let uid = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref('tasks/' + uid + '/' + taskId);
    taskRef.remove();
  }
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks);

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase();
      let taskBProp = state.tasks[b][state.sort].toLowerCase();
      if (taskAProp > taskBProp) return 1;
      else if(taskAProp < taskBProp) return -1;
      else return 0;
    });

    keysOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    });
    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted;
    if(state.search) {
      let tasksFiltered = {};
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key];
        let taskNameLowerCase = task.name.toLowerCase();
        let searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
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
