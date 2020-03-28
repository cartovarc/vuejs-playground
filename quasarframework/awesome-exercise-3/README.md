# Awesome exercise #3

This is my solution for awesome-exercise-3.

## Install and run
```sh
cd awesome-exercise-3
yarn install
quasar dev
```

## Explanation of the solution

1. Create a Vuex Store for the food items, with the four different sections and add the food data to the appropriate section

First we need add 'store-foods.js'. Note 'namespaced' allow you break the state into smaller pieces and  organize your getters/actions/mutations in different paths.

```javascript
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
}

const actions = {
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

```

then we need add foods store in store/index.js.

```javascript
  ...
  import foods from './store-foods'
  ...
```

and include it in Vuex.Store instance

```javascript
  ...
  modules: {
    solutionFoods,
    foods
  },
  ...
```


2. Create a getter to retreive the food and display these on the page using the getter

First we need to define foods getter in store-foods.js

```javascript
  ...
  const getters = {
    foods: (state) => {
      return state.foods;
    }
  }
  ...
```

so we can delete 'foods' from data and make a computed property to link it with the getter. We need to import mapGetters from Vuex.

```javascript
  ...
  import { mapGetters } from 'vuex'
  ...
  export default {
    ...
    computed: {
      ...mapGetters('foods', ['foods']),
    },
    ...
  }

```

3. Add the ability to delete an item (when the user clicks Delete) using actions & mutations - show a confirm dialog before deleting

We can start put an confirm dialog, when delete food button is fired we can call promptToDelete and pass a test id as parameter.

```html
  ...
  <q-btn
    @click.stop="promptToDelete('test-id')"
    icon="delete"
    color="red"
    flat>Delete</q-btn>
  ...
```

then we can define 'promptToDelete' in methods:

```javascript
  ....
  promptToDelete(id) {
    this.$q.dialog({
      title: 'Confirm',
      message: 'Really delete?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      console.log('delete food')
    })
  }
  ...
```

after get 'delete food' in console, we need to pass a real food id.

```html
  ...
  <food
    v-for="(food, key) in foods"
    :key="key"
    :food="food"
    :id="key"/>
  ...
```

and add 'id' prop in Food.vue

```javascript
  ...
  props: ['food', 'id'],
  ...
```

now we can access to id in Food.vue, so we can pass a real id.

```html
  ...
  <q-btn
    @click.stop="promptToDelete(id)"
    icon="delete"
    color="red"
    flat>Delete</q-btn>
  ...
```

on 'onOk' callback from 'this.$q.dialog' we can fire deleteFood action.
```javascript
  ...
  this.deleteTask(id);
  ...
```

lets import deleteTask action with mapActions, first import mapActions from vuex

```javascript
  ...
  import { mapActions } from 'vuex'
  ...
```

and in methods import deleteFood action from foods store.

```javascript
  ...
  methods: {
    ...
    ...mapActions('foods', ['deleteFood']),
    ...
  },
  ...
```

in store-foods.js we need define deleteFood action that trigger an deleteFood mutation.

```javascript
  import Vue from 'vue';
  ...
  ...
  const mutations = {
    deleteFood(state, id) {
      Vue.delete(state.foods, id);
    },
  }

  const actions = {
    deleteFood({ commit }, id){
      commit('deleteFood', id);
    }
  }
  ...
```

4. Add validation to the Add / Edit Food modal - make the Name a required field with a max of 20 characters. Make description not required, but with a max of 135 characters. Validation should be triggered when Save is clicked

We can add some rules:

```html
  ...
  <div class="row q-mb-md">
    <q-input
      filled
      v-model="foodToSubmit.name"
      label="Name (e.g. Burger)"
      class="col"
      ref="foodName"
      :rules="[val => !!val || 'Food name is required', val => val.length<=20 || 'Max 20 characters allowed']"/>
  </div>
  ...
  <div class="row q-mb-md">
    <q-input
      filled
      v-model="foodToSubmit.description"
      label="Description"
      type="textarea"
      class="col"
      ref="foodDescription"
      :rules="[val => val.length<=135 || 'Max 135 characters allowed']"/>
  </div>
  ...
```

in save button we can delete 'v-close-popup' and call submitForm on click event:

```html
  <q-btn
    label="Save"
    color="primary"
    @click="submitForm"/>
```

and define submit form to validate before food submit

```javascript
  methods: {
    submitForm() {
      this.$refs.foodName.validate();
      this.$refs.foodDescription.validate();
      if (!this.$refs.foodName.hasError && !this.$refs.foodDescription.hasError) {
        // submit food
      }
    }
  }
```

5. Add the ability to Add an item (hint: both Add and Edit modals use the same component - use the 'type' prop to differentiate)

We need a new action and mutation, so first we need import mapActions and use addFood action

```javascript
  ...
  import { mapActions} from 'vuex'
  ...

  ...
  methods: {
    ...mapActions('foods', ['addFood']),
    submitForm() {
      this.$refs.foodName.validate();
      this.$refs.foodDescription.validate();
      if (!this.$refs.foodName.hasError && !this.$refs.foodDescription.hasError) {
        this.submitFood();
      }
    },
    submitFood() {
      this.addFood(this.foodToSubmit);
      this.$emit('close');
    },
  }
  ...
```

We emmit 'close' event, so cath it to hide popup

```html
  <q-dialog
    v-model="showAddFoodModal">
    <modal-add-edit-food
      type="add"
      @close="showAddFoodModal = false"/>
  </q-dialog>
```

So, define addFood action  and addFood mutation

```javascript
  ...
  const actions = {
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

  const mutations = {
    deleteFood(state, id) {
      Vue.delete(state.foods, id);
    },
    addFood(state, payload) {
      Vue.set(state.foods, payload.id, payload.food);
    }
  }
  ...
```

We can differentiate between 'add' and 'edit' in submitForm method using type property:

```javascript
  ...
  submitFood() {
    if (this.type == 'add') {
      this.addFood(this.foodToSubmit);
    }else{
      // edit food
    }
    this.$emit('close');
  },
  ...
```

6. Add the ability to Edit an item

In ModalAddEditFood we need add 'food' and 'id' properties
```javascript
  ...
  props: ['food', 'id', 'type'],
  ...
```

also in ModalAddEditFood we need to define mounted hook and assign prop to foodToSubmit
```javascript
  mounted(){
    this.foodToSubmit = Object.assign({}, this.food);
  }
```

in Food.vue we need to pass 'food' and 'id'. Also catch close event to hide popup
  <q-dialog
    v-model="showEditFoodModal">
    <modal-add-edit-food
      type="edit"
      :food="food"
      :id="id"
      @close="showEditFoodModal = false"/>
  </q-dialog>

in submitFood method, we can use an updateFood action. Remember import updateFood action and send id and updates as a payload

```javascript
  ...mapActions('foods', ['addFood', 'updateFood']),
```

```javascript
    ...
    submitFood() {
      if (this.type == 'add') {
        this.addFood(this.foodToSubmit);
      }else{
        // edit
        this.updateFood({
          id: this.id,
          updates: this.foodToSubmit
        });
      }
      this.$emit('close');
    },
    ...
```

And define updateFood action and updateFood mutation in store-foods.js

```javascript
  ...
  const mutations = {
    updateFood(state, payload) {
      Object.assign(state.foods[payload.id], payload.updates);
    },s

  }

  const actions = {
    updateFood({ commit }, payload) {
      commit('updateFood', payload);
    },
  }
  ...
```

7. If no description is provided for a food item, display the text "No description provided." in italic text

This is my solution :)

```html
  <q-card-section>
    <span v-if="food.description.length">
      {{ food.description }}
    </span>
    <span v-else class="text-italic">
      No description provided.
    </span>
  </q-card-section>
```html


8.  If no image is provided, fall back to the image statics/image-placeholder.png
```html
  <q-img
    :src="food.imageUrl ? food.imageUrl : 'statics/image-placeholder.png'"
    basic
    contain
  >
```html
