<template>
  {{tasks.length}}
  <h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ countActiveTasks }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" :statusText="task.statusText"/>
      </h2>
      <p>
        <strong>
          <small>
            {{ new Date(task.date).toLocaleString().substring(0,10) }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="goToTask(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {computed, onMounted} from 'vue'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      store.dispatch('loadTasks')
    })

    function goToTask(id) {
      store.dispatch('getCurrentTask', id)
      router.push(`/tasks/${id}`)
    }

    return {
      tasks: computed(() => store.getters.tasks),
      countActiveTasks: computed(() => store.getters.countActiveTasks),
      goToTask
    }
  },
  components: {AppStatus}
}
</script>
