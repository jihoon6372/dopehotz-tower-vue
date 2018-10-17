import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Dashboard from '@/components/Dashboard'
import Post from '@/components/Post'
import Tracks from '@/components/Tracks'
import Profile from '@/components/Profile'
import PostSelect from '@/components/PostSelect'
import PostCreate from '@/components/PostCreate'
import PostDone from '@/components/PostDone'
import Auth from '@/components/Auth'
import Logout from '@/components/Logout'
import Notice from '@/components/Notice'

import VueCarousel from 'vue-carousel'

 
Vue.use(Router)
Vue.use(VueCarousel);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/post/select',
      name: 'post_select',
      component: PostSelect
    },
    {
      path: '/post/create/:id',
      name: 'post_create',
      component: PostCreate
    },
    {
      path: '/post/done',
      name: 'post_done',
      component: PostDone
    },
    {
      path: '/tracks',
      name: 'tracks',
      component: Tracks
    },
    {
      path: '/tracks/:type',
      name: 'tracks_type',
      component: Tracks,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/auth/:token',
      name: 'auth',
      component: Auth
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    }


  ]
})
