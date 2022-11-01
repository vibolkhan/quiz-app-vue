import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PageNotFound from '../components/page-notfound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      hideNavbar: true,
      login: true
    }
  },
  {
    path: '/dashbord',
    name: 'home',
    component: HomeView,
    meta:{
      isAuthentication:true,
    },
  },
  {
    path: '/question',
    name: 'question',
    component: () => import('../views/AboutView.vue'),
    meta:{
      isAuthentication:true,
    },
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('../views/QuizView.vue'),
    meta:{
      isAuthentication:true,
    },
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('../components/play-quiz.vue'),
    meta:{
      isAuthentication:true,
    },
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../components/result-view.vue'),
    meta:{
      isAuthentication:true,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component: LoginView,
    meta: {
      logout: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
    meta: {
      hideNavbar: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuthentication) {
    if (!sessionStorage.getItem("token") ) {
      next("/");
    } else {
      next();
    }
  } 
  else {
    next();
  }
});

export default router
