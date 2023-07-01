import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import QuestionPage from '../views/QuestionPage.vue'
import DetailQuestionPage from '../views/DetailQuestionPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CreateQuestionPage from '../views/CreateQuestionPage.vue'
import ProfilePage from '../views/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/question',
      name: 'question',
      component: QuestionPage
    },
    {
      path: '/question/:id',
      name: 'detail-question',
      component: DetailQuestionPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/create-question',
      name: 'create-question',
      component: CreateQuestionPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
