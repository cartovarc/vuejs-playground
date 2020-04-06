<template>
  <q-select
    v-model="sortBy"
    :options="options"
    class="col q-ml-sm"
    emit-value
    map-options
    filled
    stack-label
    label="Sort By"
  />
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      options: [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Date',
          value: 'dueDate'
        }
      ],
    }
  },
  computed: {
    ...mapState('tasks', ['sort']),
    sortBy: {
      get () {
        return this.sort;
      },
      set (value) {
        this.setSort(value);
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['setSort']),
  }
}
</script>

<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
