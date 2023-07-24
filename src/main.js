
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import axios from 'axios'
window.axios =axios;
// $scope.
createApp(App).use(router).mount('#app')
