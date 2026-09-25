import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../locales/i18n.js'
// mapping routes
const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('/src/views/HomeView.vue'),
      meta: {
          title: 'home'
      }
    },
    {
        path: '/monitoring/:type',
        name: 'monitoring',
        component: () => import('/src/views/MonitoringView.vue'),
        meta: {
            title: 'monitoring'
        }
    },
    {
        path: '/monitoring/:type/:itemId',
        name: 'monitoring-overview',
        component: () => import('/src/views/MonitoringOverview.vue'),
        meta: {
            title: 'monitoring'
        }
    },
    {
        path: '/manage/:itemId',
        name: 'manage-overview',
        component: () => import('/src/views/ManageView.vue'),
        meta: {
            title: 'manageOverview'
        }
    },
    {
        path: "/emergency",
        name: "emergency-data",
        component: () => import('/src/views/EmergencyDataView.vue'),
        meta: {
            title: 'emergencyData'
        }
    },
    {
        path: '/preferences',
        name: 'preferences',
        component: () => import('/src/views/PreferencesView.vue'),
        meta: {
            title: 'preferences'
        }
    },
    {
      path: '/register/:itemId',
      name: 'register',
      component: () => import('/src/views/RegisterView.vue'),
      meta: {
          title: 'register'
      }
    },
    {
        path: '/backup/:backupId',
        name: 'backup',
        component: () => import('/src/views/BackupView.vue'),
        meta: {
            title: "backup"
        }
    },
    {
        path: '/manual',
        name: 'manual',
        component: () => import('/src/views/ManualView.vue'),
        meta: {
            title: "manual"
        }
    },
    {
        path: '/terms',
        name: 'terms',
        component: () => import('/src/views/TermsView.vue'),
        meta: {
            title: "terms"
        }
    },
    {
        path: '/notifications',
        name: 'notifications',
        component: () => import('/src/views/NotificationsView.vue'),
        meta: {
            title: "notifications"
        }
    },
    {
        path: '/erase',
        name: 'erase',
        component: () => import('/src/views/EraseDataView.vue'),
        meta: {
            title: "erase"
        }
    },
    {
        path: "/not-found",
        name: 'not-found',
        component: () => import('/src/views/AppFallback.vue'),
        meta: {
            title: "notFound"
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
    const title = to.meta.title
    document.title = `${i18n.global.t(`meta.${title}`)} | Facil Care`
})

export default router