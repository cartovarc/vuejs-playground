<template>
  <q-item
    v-ripple
    @click="updateTask({ id: id, updates: { completed: !task.completed }})"
    :class="task.completed ? 'bg-green-1' : 'bg-orange-1'"
    clickable>
    <q-item-section side top>
      <q-checkbox
      :value="task.completed"
      class="no-pointer-events"/>
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{'text-strikethrough': task.completed}">
        {{ task.name }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <div class="colum justify-center">
          <q-icon
            name="event"
            size="18px"
            class="q-mr-xs"/>
        </div>
        <div class="colum">
          <q-item-label
            class="row justify-end"
            caption>
            {{ task.dueDate }}
          </q-item-label>
          <q-item-label
            class="row justify-end"
            caption>
            <small>
              {{ task.dueTime }}
            </small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <q-btn
      @click.stop="promptToDelete(id)"
        flat
        round
        dense
        color="red"
        icon="delete"/>
    </q-item-section>

  </q-item>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  props: ['task', 'id'],
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promptToDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTask(id);
      })
    }
  }
}
</script>

<style>
</style>
