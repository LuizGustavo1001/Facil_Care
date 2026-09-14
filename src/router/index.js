import { createRouter, createWebHistory } from 'vue-router'

// mapping routes
const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('/src/views/HomeView.vue'),
      meta: {
          title: 'Início | Facil Care'
      }
    },
    {
        path: '/vital-signs',
        name: 'vital-signs',
        component: () => import('/src/views/VitalSignsView.vue'),
        meta: {
            title: 'Sinais Vitais | Facil Care'
        }
    },
    {
        path: '/monitoring',
        name: 'monitoring',
        component: () => import('/src/views/MonitoringView.vue'),
        meta: {
            title: 'Monitoramento | Facil Care'
        }
    },
    {
        path: "/emergency-data",
        name: "emergency-data",
        component: () => import('/src/views/EmergencyDataView.vue'),
        meta: {
            title: 'Dados de Emergência | Facil Care'
        }
    },
    {
        path: "/refresh-theme",
        name: 'refresh-theme',
        component: () => import('/src/views/RefreshThemeView.vue'),
        meta: {
            title: 'Refresh Theme | Facil Care'
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