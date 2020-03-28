<template>
  <q-card>
    <modal-header>Edit task</modal-header>
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
  props: ['task', 'id'],
  data() {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitForm() {
      this.$refs.modalTaskName.$refs.taskName.validate();
      if (!this.$refs.modalTaskName.$refs.taskName.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
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
  },
  mounted(){
    this.taskToSubmit = Object.assign({}, this.task);
  }
}
</script>
