import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes/index';
import store from './helpers/store';
import requestsHandler from './helpers/requestsHandler';
import lodash from 'lodash';

Vue.prototype.$requestsHandler = requestsHandler;
Vue.prototype.$_ = lodash;

Vue.config.productionTip = false;

import '@/assets/css/main.scss';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
