import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { PAGES } from "../constants/sysPages"
import { i18n } from "../locales/i18n"

// mapping routes
const routes: RouteRecordRaw[] = [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
          title: PAGES.HOME
      }
    },
    {
        path: "/services",
        name: "services",
        component: () => import('../views/ServiceView.vue'),
        meta: {
            title : PAGES.SERVICES
        }
    },
    {
        path: "/patientData",
        name: "patientData",
        component: () => import('../views/PatientDataView.vue'),
        meta: {
            title : PAGES.PATIENT_DATA
        }
    },
    {
        path: '/monitoring/:category',
        name: 'monitoring',
        component: () => import('../views/MonitoringView.vue'),
        meta: {
            title: PAGES.MONITORING
        }
    },
    {
        path: '/monitoring/:category/:monitoring',
        name: 'monitoring-overview',
        component: () => import('../views/MonitoringOverview.vue'),
        meta: {
            title: PAGES.MONITORING
        }
    },
    {
        path: '/manage/:category',
        name: 'manage-overview',
        component: () => import('../views/ManageView.vue'),
        meta: {
            title: PAGES.MANAGE
        }
    },
    {
        path: "/emergencyData",
        name: "emergency-data",
        component: () => import('../views/EmergencyDataView.vue'),
        meta: {
            title: PAGES.EMERGENCY_DATA
        }
    },
    {
        path: '/preferences',
        name: 'preferences',
        component: () => import('../views/PreferencesView.vue'),
        meta: {
            title: PAGES.PREFERENCES
        }
    },
    {
      path: '/register/:category',
      name: 'register-form',
      component: () => import('../views/RegisterView.vue'),
      meta: {
          title: PAGES.REGISTER
      }
    },
    {
        path: "/backup/import",
        name: 'import-data',
        component: () => import('../views/ImportView.vue'),
        meta: {
            title: PAGES.IMPORT
        }
    },
    {
        path: "/backup/export",
        name: 'export-data',
        component: () => import('../views/ExportView.vue'),
        meta: {
            title: PAGES.EXPORT
        }
    },
    {
      path: "/backup/export/:type",
      name: "export-data-type",
      component: () => import('../views/ExportOptionView.vue'),
      meta: {
          title: PAGES.EXPORT
      }
    },
    {
        path: '/userManual',
        name: 'manual',
        component: () => import('../views/ManualView.vue'),
        meta: {
            title: PAGES.USER_MANUAL
        }
    },
    {
        path: '/terms',
        name: 'terms',
        component: () => import('../views/TermsView.vue'),
        meta: {
            title: PAGES.TERMS
        }
    },
    {
        path: '/eraseData',
        name: 'erase',
        component: () => import('../views/EraseDataView.vue'),
        meta: {
            title: PAGES.ERASE
        }
    },
    {
        path: '/about',
        name: 'aboutSystem',
        component: () => import('../views/AboutView.vue'),
        meta: {
            title: PAGES.ABOUT
        }
    },
    {
        path: "/not-found",
        name: 'not-found',
        component: () => import('../views/AppFallback.vue'),
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
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    }
})

// Update document title
router.afterEach((to) => {
    const title = to.meta.title as string | undefined
    if (title) {
        const translated = i18n.global.t(`meta.${title}`)
        document.title = `${translated} | FacilCare`
    }
})
export default router