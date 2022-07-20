import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
 

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",    
    component: Dashboard,
  },
  
  
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
      
   
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});
export default router;
