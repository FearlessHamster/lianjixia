import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import layer from '@layui/layer-vue';
import '@layui/layer-vue/lib/index.css';
import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(layer);
app.use(ElementPlus)


app.mount('#app')
