<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" :statusText="task.statusText" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleString().substring(0,10) }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="updateStatus('pending', 'Выполняется')">Взять в работу</button>
      <button class="btn primary" @click="updateStatus('done', 'Завершен')">Завершить</button>
      <button class="btn danger" @click="updateStatus('cancelled', 'Отменен')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ $route.params.id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  setup() {
    const store = useStore()

    function updateStatus(status, statusText) {
      const statusUpd = {
        status: status,
        statusText: statusText
      }
      store.dispatch('updateTask', statusUpd)
    }

    return {
      task: computed(() => store.getters.currentTask),
      updateStatus
    }
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>
