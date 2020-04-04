<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth', ['handleAuthStateChanged']),

  },
  mounted() {
    this.getSettings();
    this.handleAuthStateChanged();
  }
}
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }

</style>
