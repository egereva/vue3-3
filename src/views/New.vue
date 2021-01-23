<template>
  <form class="card" @submit.prevent="addTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="isDisabledBtn">Создать</button>
  </form>
</template>


<script>
import {reactive, toRefs, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    let task = reactive({
      title: '',
      date: '',
      description: ''
    })

    const isDisabledBtn = computed(() => {
      let noValid = 0
      Object.keys(task).forEach((key) => {
        if(!task[key]) { noValid ++}
      })
      return noValid
    })


    function addTask() {
      const isPast = new Date().toISOString().substring(0,10) > task.date

      const taskResult = {
        ...task,
        id: BigInt("0x" + uuidv4().replace(/-/g, "")).toString().substr(0,9),
        status: isPast ? 'cancelled' : 'active',
        statusText: isPast ? 'Отменен' : 'Активен'
      }
      store.dispatch('addTask', taskResult)
      router.push('/')

      resetForm()
    }

    function resetForm() {
      task.title = ''
      task.date = ''
      task.description = ''
    }

    return {
      ...toRefs(task),
      addTask,
      isDisabledBtn
    }
  }
}
</script>
