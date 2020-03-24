<template>
  <q-page padding>
    <button @click="counter++" style="position: absolute; right: 10px;">{{ counter }}</button>

    <input
      v-model="message"
      @keyup.esc="clearMessage"
      @keyup.enter="alertMessage"
      @mouseleave="clearMessage"
      v-autofocus
      :style="errorStyle" />
    <button @click="clearMessage">Clear</button>

    <div v-bind:class="{ 'warning' : message.length > 22 }">{{message.length}}</div>

    <!-- v-show, hide with style. -->
    <h5
      v-show="message.length"
      class="border-gray">{{message}}</h5>
    <!--  v-if, delete from DOM. -->
    <h5
      v-if="message.length"
      class="border-gray">{{message}}</h5>

    <h6 v-else>No message entered :(</h6>

    <hr>

    <p :class="{'my-align-1': message.length > 22, 'my-align-2': message.length <= 22}" ref="upperCaseMessage" >Uppercase message: {{ messageUpperCase }}</p>
    <p>Lowercase message: {{ message | messageLowerCase }}</p>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      message: "I love Vue.js! so hard",
      counter: 0,
    }
  },
  // if we declare messageUpperCase as method, "messageUpperCase was fired" will printed for each clic in counter
  computed: {
    messageUpperCase() {
      console.log("messageUpperCase was fired");
      return this.message.toUpperCase();
    },
    errorStyle() {
      if(this.message.length > 22){
        return {
          'color': 'red',
          'background': 'pink'
        }
      }else{
        return {}
      }
    }
  },
  methods: {
    clearMessage() {
      this.message = '';
    },
    alertMessage() {
      alert(this.message);
    }
  },
  filters: {
    messageLowerCase(value) {
      return value.toLowerCase();
    }
  },
  directives: {
    autofocus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    this.$refs.upperCaseMessage.value = '123456';
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
   updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
}
</script>

<style>
  .border-gray {
    border: 1px solid gray;
  }
  .warning {
    color: yellow;
    background: black;
  }
  .my-align-1 {
    text-align: center;
  }
  .my-align-2 {
    text-align: right;
  }
</style>
