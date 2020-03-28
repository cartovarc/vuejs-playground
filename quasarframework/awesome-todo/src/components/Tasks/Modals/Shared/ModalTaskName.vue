<template>
  <div class="q-mb-sm">
    <q-input
      :value="name"
      @input="$emit('update:name', $event)"
      autofocus
      clearable
      clear-icon="close"
      label="Task name"
      outlined
      ref="taskName"
      :rules="[val => !!val || 'Field is required']"/>
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>
