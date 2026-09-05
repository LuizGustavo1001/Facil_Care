// using lazy loading

import { createRouter, createWebHistory } from 'vue-router'

// mapping routes
const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('/src/views/HomeView.vue'),
      meta: {
          title: 'Início | FacilCare'
      }
    },
    {
        path: '/vital-signs',
        name: 'vital-signs',
        component: () => import('/src/views/VitalSignsView.vue'),
        meta: {
            title: 'Sinais Vitais | FacilCare'
        }
    },
    // generic route (path not found)
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition){
        if(savedPosition){
            return savedPosition
        }
        return { top: 0 }
    }
})

// update document title
router.afterEach((to) => {
    document.title = to.meta.title || 'FacilCare'
})

export default router