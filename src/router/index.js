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
import UsersPage from '../views/admin/UsersPage.vue'
import PostsPage from '../views/admin/PostsPage.vue'
import CommentsPage from '../views/admin/CommentsPage.vue'
import ReportsPage from '../views/admin/ReportsPage.vue'

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

    // Admin Route
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: DashboardPage
    },
    // {
    //   path: '/admin/users/:id',
    //   name: 'admin-user',
    //   component: UsersPage
    // },
    // {
    //   path: '/admin/posts/:id',
    //   name: 'admin-post',
    //   component: PostsPage
    // },
    // {
    //   path: '/admin/comments/:id',
    //   name: 'admin-comment',
    //   component: CommentsPage
    // },
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
