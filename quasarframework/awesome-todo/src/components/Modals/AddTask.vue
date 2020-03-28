<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add task</div>
      <q-space/>
      <q-btn v-close-popup flat round color="primary" icon="close" />
    </q-card-section>

    <q-form @submit="submitForm()">
      <q-card-section class="q-pt-none">
        <div class="q-mb-sm">
          <q-input
            clearable
            clear-icon="close"
            autofocus
            outlined
            v-model="taskToSubmit.name"
            label="Task name"
            ref="taskName"
            :rules="[val => !!val || 'Field is required']"/>
        </div>
        <div class="q-mb-sm">
          <q-input
            outlined
            label="Due date"
            v-model="taskToSubmit.dueDate">
            <template v-slot:append>
              <q-icon
                @click="clearDueDate"
                v-if="taskToSubmit.dueDate"
                icon="close"
                name='close'
                class="cursor-pointer">
              </q-icon>
              <q-icon
                name="event"
                class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale">
                  <q-date
                    v-model="taskToSubmit.dueDate"
                    @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          v-show="taskToSubmit.dueDate"
          class="q-mb-sm">
          <q-input
            outlined
            label="Due time"
            v-model="taskToSubmit.dueTime">
            <template v-slot:append>
              <q-icon
                @click="taskToSubmit.dueTime = ''"
                v-if="taskToSubmit.dueTime"
                icon="close"
                name='close'
                class="cursor-pointer">
              </q-icon>
              <q-icon
                name="access_time"
                class="cursor-pointer">
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Save"
          color="primary"
          type="submit"/>
      </q-card-actions>
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
      this.$refs.taskName.validate();
      if (!this.$refs.taskName.hasError) {
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

<style>

</style>
