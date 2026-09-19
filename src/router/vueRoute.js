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
        path: '/monitoring/:type',
        name: 'monitoring',
        component: () => import('/src/views/MonitoringView.vue'),
        meta: {
            title: 'Monitoramento | Facil Care'
        }
    },
    {
        path: '/monitoring/:type/:itemId',
        name: 'monitoring-overview',
        component: () => import('/src/views/MonitoringOverView.vue'),
        meta: {
            title: 'Monitoramento | Facil Care'
        }
    },
    {
        path: '/manage/:itemId',
        name: 'manage-overview',
        component: () => import('/src/views/ManageView.vue'),
        meta: {
            title: 'Gerenciamento | Facil Care'
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
        path: '/preferences',
        name: 'preferences',
        component: () => import('/src/views/PreferencesView.vue'),
        meta: {
            title: 'Preferências | Facil Care'
        }
    },
    {
      path: '/register/:itemId',
      name: 'register',
      component: () => import('/src/views/RegisterView.vue'),
      meta: {
          title: 'Registro | Facil Care'
      }
    },
    {
        path: '/backup/:backupId',
        name: 'backup',
        component: () => import('/src/views/BackupView.vue'),
        meta: {
            title: "Backup | Facil Care"
        }
    },
    {
        path: '/manual',
        name: 'manual',
        component: () => import('/src/views/ManualView.vue'),
        meta: {
            title: "Manual do Usuário | Facil Care"
        }
    },
    {
        path: '/terms',
        name: 'terms',
        component: () => import('/src/views/TermsView.vue'),
    },
    {
        path: "/refresh-theme",
        name: 'refresh-theme',
        component: () => import('/src/views/RefreshThemeView.vue'),
        meta: {
            title: 'Refresh Theme | Facil Care'
        }
    },
    {
        path: "/not-found",
        name: 'not-found',
        component: () => import('/src/views/AppFallback.vue'),
        meta: {
            title: "Página não encontrada | Facil Care"
        }
    },
    // generic route (path not found)
    {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found'
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