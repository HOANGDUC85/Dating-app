

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Add the necessary CSS
export default {
    devServer: {
      proxy: 'http://localhost:8080',
    },
  };
  
const app = createApp(App)
app.use(router)

app.mount('#app')

