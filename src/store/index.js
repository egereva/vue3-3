import { createStore } from 'vuex'
import tasksModule from '@/store/modules/tasks'

export const store = createStore({
    modules: {
        tasksModule
    },
    state() {
        return {}
    },
    mutations: {},
    actions: {},
    getters: {}
})
