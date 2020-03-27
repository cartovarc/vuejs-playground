const state = {
  tasks: {
    "ID1": {
      name: 'Get chicharron',
      completed: false,
      dueDate: '2020/03/27',
      dueTime: '15:30'
    },
    "ID2": {
      id: 2,
      name: 'Get bananas',
      completed: true,
      dueDate: '2020/03/28',
      dueTime: '16:30'
    },
    "ID3": {
      id: 3,
      name: 'Get apples',
      completed: false,
      dueDate: '2020/03/29',
      dueTime: '17:30'
    }
  }
}

const mutations = {

}

const actions = {

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
