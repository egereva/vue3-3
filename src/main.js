import { createApp } from 'vue'
import App from './App.vue'
import './theme.css'
import {router} from '@/router'
import {store} from '@/store/index'
import firebase from 'firebase/app'
import 'firebase/database'

firebase.initializeApp({
    apiKey: "AIzaSyDmtJSC24bs3W0WVEcZFa5h-Y7Bktn5V7M",
    authDomain: "vue3-3.firebaseapp.com",
    databaseURL: "https://vue3-3-default-rtdb.firebaseio.com",
    projectId: "vue3-3",
    storageBucket: "vue3-3.appspot.com",
    messagingSenderId: "832790142729",
    appId: "1:832790142729:web:5e4b79ce2ba8459c747dd8"
})

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
