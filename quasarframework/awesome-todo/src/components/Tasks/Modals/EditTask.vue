<template>
  <q-card>
    <modal-header>Edit task</modal-header>
    <q-form @submit="submitForm()">
      <q-card-section class="q-pt-none">
        <modal-task-name
          ref="modalTaskName"
          :name.sync="taskToSubmit.name"
        />
        <modal-due-date
          @clear="clearDueDate"
          :dueDate.sync="taskToSubmit.dueDate"
        />
        <modal-due-time
          v-show="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
      </q-card-section>
      <modal-buttons></modal-buttons>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import addEditTaskMixin from 'src/mixins/mixin-add-edit-task.js'

export default {
  mixins: [addEditTaskMixin],
  props: ['task', 'id'],
  data () {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitTask () {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit('close');
    }
  },
  mounted () {
    this.taskToSubmit = Object.assign({}, this.task);
  }
}
</script>
