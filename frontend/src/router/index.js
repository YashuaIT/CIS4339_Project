import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'blank' },
    component: () => import('../components/login.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue'),
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue'),
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue')
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('../components/service.vue'),
  },
  {
    path: '/createservice',
    name: 'createservice',
    component: () => import('../components/createService.vue')
  },
  {
    path: '/updateservice/:id',
    name: 'updateservice',
    props: true,
    component: () => import('../components/updateService.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router
