<template>
  <li>
    <div><slot></slot> {{ index }}</div>
    <small>{{ task.dueDate}} @ {{ task.dueTime }}</small>
    <button @click="deleteTask(index)">X</button>
  </li>
</template>

<script>
export default {
  props: ['task', 'index']
}
</script>

<style>
</style>
