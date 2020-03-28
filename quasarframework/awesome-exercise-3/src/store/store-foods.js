import Vue from 'vue';
import { uid } from 'quasar'

const state = {
  foods: {
    "ID1": {
      name: 'Burger',
      description: 'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
      imageUrl: 'https://i.imgur.com/0umadnY.jpg',
      rating: 4
    },
    "ID2": {
      name: 'Pizza',
      description: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.',
      imageUrl: 'https://i.imgur.com/b9zDbyb.jpg',
      rating: 5
    },
    "ID3": {
      name: 'Sprouts',
      description: 'The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.',
      imageUrl: 'https://i.imgur.com/RbKjUjB.jpg',
      rating: 1
    }
  }
}

const mutations = {
  updateFood(state, payload) {
    Object.assign(state.foods[payload.id], payload.updates);
  },
  deleteFood(state, id) {
    Vue.delete(state.foods, id);
  },
  addFood(state, payload) {
    Vue.set(state.foods, payload.id, payload.food);
  }
}

const actions = {
  updateFood({ commit }, payload) {
    commit('updateFood', payload);
  },
  deleteFood({ commit }, id){
    commit('deleteFood', id);
  },
  addFood({ commit }, food) {
    let id = uid();
    let payload = {
      id: id,
      food: food
    }
    commit('addFood', payload);
  }
}

const getters = {
  foods: (state) => {
    return state.foods;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
