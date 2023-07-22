import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import QuestionPage from '../views/QuestionPage.vue'
import DetailQuestionPage from '../views/DetailQuestionPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CreateQuestionPage from '../views/CreateQuestionPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import EditProfilePage from '../views/EditProfilePage.vue'
import PageNotFound from '../views/PageNotFound/PageNotFound.vue'
import DashboardPage from '../views/admin/DashboardPage.vue'
import ReportsPage from '../views/admin/ReportsPage.vue'
import SearchMobilePage from '../views/SearchMobilePage/Index.vue'

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
      path: '/question/:id', // param id
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
      meta: { showQuestionDelete: true },
      component: ProfilePage
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      component: EditProfilePage
    },
    {
      path: '/search',
      name: 'search-page-mobile',
      component: SearchMobilePage
    },

    // Admin Route
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: DashboardPage
    },
    {
      path: '/admin/reports',
      name: 'admin-report',
      component: ReportsPage
    },
    // End of Admin Route


    {
      path: '/:pathMatch(.*)',
      name: 'page-not-found',
      component: PageNotFound
    },
  ]
})

export default router
