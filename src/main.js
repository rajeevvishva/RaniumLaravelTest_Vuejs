import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
//import axios from "axios";
import VueSimpleAlert from "vue-simple-alert";

 

Vue.use(VueSimpleAlert);
/*eslint-disable */

 
new Vue({  
  router,  
  render: (h) => h(App),
}).$mount("#app");

