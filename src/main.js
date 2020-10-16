import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import '@/assets/styles/index.css';
import titleMixin from './mixins/titleMixin'

createApp(App)
  .use(store)
  .mixin(titleMixin)
  .mount('#app')
