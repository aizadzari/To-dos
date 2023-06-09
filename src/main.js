import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'



const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable
  },
  directives,
  ssr: true,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})

createApp(App).use(vuetify).mount('#app')
