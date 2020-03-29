<template>
  <q-card>
    <modal-header>Add task</modal-header>
    <q-form @submit="submitForm()">
      <q-card-section class="q-pt-none">
        <modal-task-name
          ref="modalTaskName"
          :name.sync="taskToSubmit.name"/>
        <modal-due-date
          @clear="clearDueDate"
          :dueDate.sync="taskToSubmit.dueDate"/>
        <modal-due-time
          v-show="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"/>
      </q-card-section>
      <modal-buttons></modal-buttons>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions} from 'vuex'
import addEditTaskMixin from 'src/mixins/mixin-add-edit-task.js'

export default {
  mixins: [addEditTaskMixin],
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitForm() {
      this.$refs.modalTaskName.$refs.taskName.validate();
      if (!this.$refs.modalTaskName.$refs.taskName.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit('close');
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = '';
      this.taskToSubmit.dueTime = '';
    }
  }
}
</script>
