import { createApp } from 'vue'
import { createPinia } from 'pinia'
import layer from '@layui/layer-vue';
import '@layui/layer-vue/lib/index.css';
import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(layer);

app.mount('#app')
