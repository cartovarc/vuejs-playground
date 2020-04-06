<template>
  <div class="q-mb-sm">
    <q-input
      outlined
      label="Due date"
      :value="dueDate"
      @input="$emit('update:dueDate', $event)"
    >
      <template v-slot:append>
        <q-icon
          @click="$emit('clear')"
          v-if="dueDate"
          icon="close"
          name='close'
          class="cursor-pointer"
        >
        </q-icon>
        <q-icon
          name="event"
          class="cursor-pointer"
        >
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              value="dueDate"
              @input="($event) => { $refs.qDateProxy.hide(); $emit('update:dueDate', $event); }"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['dueDate'],
}
</script>
