import axios from 'axios'
import firebase from 'firebase/app'

export default ({
    state() {
        return {
            tasks: [],
            currentTask: null
        }
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks
        },
        setCurrentTask(state, task) {
            state.currentTask = task
        }
    },
    actions: {
        async addTask({_,dispatch},task) {
            await axios.post('https://vue3-3-default-rtdb.firebaseio.com/tasks.json', task)
            dispatch('loadTasks')
        },
        async loadTasks({commit}) {
            try{
                const {data} = await axios.get('https://vue3-3-default-rtdb.firebaseio.com/tasks.json')
                if (data) {
                    const tasks = Object.keys(data).map(key => {
                        return {
                            idFirebase: key,
                            ...data[key]
                        }
                    })
                    commit('setTasks', tasks)
                }
            } catch (e) {
                throw e
            }
        },
        getCurrentTask({commit, getters}, id) {
            const task = getters.tasks.find(item => item.id === id)
            if (task) {
                commit('setCurrentTask', task)
            }
        },
        async updateTask({ dispatch, commit, getters }, toUpdate) {
            try {
                const taskKey = getters.currentTask.idFirebase
                await firebase.database().ref(`/tasks/` + taskKey).update({...getters.currentTask, ...toUpdate})
                commit('setCurrentTask', {...getters.currentTask, ...toUpdate})
            } catch (e) {
                throw e
            }
        }
    },
    getters: {
        tasks: state => state.tasks,
        currentTask: state => state.currentTask,
        countActiveTasks (_, getters) {
            let count = 0
            getters.tasks.forEach(item => { item.status === 'active' ? count++ : count})
            return count
        }
    }
})
