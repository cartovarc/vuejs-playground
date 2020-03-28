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

export default {
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
  },
  components: {
    'modal-header': require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
    'modal-task-name': require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
    'modal-due-date': require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
    'modal-due-time': require('components/Tasks/Modals/Shared/ModalDueTime.vue').default,
    'modal-buttons': require('components/Tasks/Modals/Shared/ModalButtons.vue').default
  }
}
</script>
