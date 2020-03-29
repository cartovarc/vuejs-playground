<template>
  <div class="q-mb-sm">
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      v-select-all
      clearable
      clear-icon="close"
      ref="taskName"
      label="Task name"/>
  </div>
</template>

<script>
export default {
  props: ['name'],
  directives: {
    selectAll: {
      inserted(el) {
        // issue, select does not work in first popup
        // https://github.com/cartovarc/vuejs-playground/issues/7
        let input = el.querySelector('.q-field__native')
        input.addEventListener('focus', () => {
          if(input.value.length) {
            input.select()
          }
        });
      }
    }
  }
}
</script>
