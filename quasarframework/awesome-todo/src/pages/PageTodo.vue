<template>
  <q-page class="q-pa-md">
    <q-list
      bordered
      separated>
      <q-item
        v-ripple
        v-for="task in tasks"
        @click="task.completed = !task.completed"
        :class="task.completed ? 'bg-green-1' : 'bg-orange-1'"
        clickable
        :key="task.id">
        <q-item-section side top>
          <q-checkbox :value="task.completed" />
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

      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          name: 'Get chicharron',
          completed: false,
          dueDate: '2020/03/27',
          dueTime: '15:30'
        },
        {
          id: 2,
          name: 'Get bananas',
          completed: true,
          dueDate: '2020/03/28',
          dueTime: '16:30'
        },
        {
          id: 3,
          name: 'Get apples',
          completed: false,
          dueDate: '2020/03/29',
          dueTime: '17:30'
        }
      ]
    }
  }
}
</script>

<style>
</style>
