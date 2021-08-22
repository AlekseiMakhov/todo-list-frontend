import { createApp } from 'vue';
import App from '@/App.vue';
import '@/vendor/normalize.css';
import loader from "vue-ui-preloader";
import components from '@/components';

const app = createApp(App)

// глобальная регистрация компонентов
components.forEach(comp => {
    app.component(comp.name, comp)
})

app.use(loader).mount('#app');
