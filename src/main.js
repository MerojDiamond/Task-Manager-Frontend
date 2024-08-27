import { createApp } from 'vue'
import './style.css'
import './css/index.css'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'

const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives,
})

import Toast, {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";


app.use(Toast, {
    position: POSITION.TOP_RIGHT
});
app.use(vuetify);

app.mount('#app')
