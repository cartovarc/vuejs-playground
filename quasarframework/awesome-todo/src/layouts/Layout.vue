<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>
        <q-btn
          v-if="!loggedIn"
          to="/auth"
          class="absolute-right"
          icon-right="account_circle"
          label="Login"
          flat/>
        <q-btn
          @click="logout"
          v-else
          class="absolute-right"
          icon-right="account_circle"
          label="Logout"
          flat/>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="link in navLinks"
          :key="link.title"
          :icon="link.icon"
          :label="link.title"
          :to="link.to"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-if="loggedIn"
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>
        <NavLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavLink from 'components/NavLink'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'MainLayout',

  components: {
    NavLink
  },

  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  data () {
    return {
      leftDrawerOpen: false,
      navLinks: [
        {
          title: 'Todo',
          caption: 'Tasks to do',
          icon: 'list',
          to: '/'
        },
          {
          title: 'Settings',
          caption: 'App configuration',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      this.logoutUser();
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px){
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>
