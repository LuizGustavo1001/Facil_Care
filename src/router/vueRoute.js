import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../locales/i18n.js'
import { PAGES } from "../constants/sysPages.js"

// mapping routes
const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('/src/views/HomeView.vue'),
      meta: {
          title: PAGES.HOME
      }
    },
    {
        path: "/services",
        name: "services",
        component: () => import('/src/views/ServiceView.vue'),
        meta: {
            title : PAGES.SERVICES
        }
    },
    {
        path: "/patientData",
        name: "patientData",
        component: () => import('/src/views/PatientDataView.vue'),
        meta: {
            title : PAGES.PATIENT_DATA
        }
    },
    {
        path: '/monitoring/:category',
        name: 'monitoring',
        component: () => import('/src/views/MonitoringView.vue'),
        meta: {
            title: PAGES.MONITORING
        }
    },
    {
        path: '/monitoring/:category/:monitoring',
        name: 'monitoring-overview',
        component: () => import('/src/views/MonitoringOverview.vue'),
        meta: {
            title: PAGES.MONITORING
        }
    },
    {
        path: '/manage/:category',
        name: 'manage-overview',
        component: () => import('/src/views/ManageView.vue'),
        meta: {
            title: PAGES.MANAGE
        }
    },
    {
        path: "/emergencyData",
        name: "emergency-data",
        component: () => import('/src/views/EmergencyDataView.vue'),
        meta: {
            title: PAGES.EMERGENCY_DATA
        }
    },
    {
        path: '/preferences',
        name: 'preferences',
        component: () => import('/src/views/PreferencesView.vue'),
        meta: {
            title: PAGES.PREFERENCES
        }
    },
    {
      path: '/register/:category',
      name: 'register-form',
      component: () => import('/src/views/RegisterView.vue'),
      meta: {
          title: PAGES.REGISTER
      }
    },
    {
        path: "/backup/import",
        name: 'import-data',
        component: () => import('/src/views/ImportView.vue'),
        meta: {
            title: PAGES.IMPORT
        }
    },
    {
        path: "/backup/export",
        name: 'export-data',
        component: () => import('/src/views/ExportView.vue'),
        meta: {
            title: PAGES.EXPORT
        }
    },
    {
      path: "/backup/export/:type",
      name: "export-data-type",
      component: () => import('/src/views/ExportOptionView.vue'),
      meta: {
          title: PAGES.EXPORT
      }
    },
    {
        path: '/userManual',
        name: 'manual',
        component: () => import('/src/views/ManualView.vue'),
        meta: {
            title: PAGES.USER_MANUAL
        }
    },
    {
        path: '/terms',
        name: 'terms',
        component: () => import('/src/views/TermsView.vue'),
        meta: {
            title: PAGES.TERMS
        }
    },
    {
        path: '/eraseData',
        name: 'erase',
        component: () => import('/src/views/EraseDataView.vue'),
        meta: {
            title: PAGES.ERASE
        }
    },
    {
        path: '/about',
        name: 'aboutSystem',
        component: () => import('/src/views/AboutView.vue'),
        meta: {
            title: PAGES.ABOUT
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
        if(savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    }
})

// update document title
router.afterEach((to) => {
    const title = to.meta.title
    document.title = `${i18n.global.t(`meta.${title}`)} | FacilCare`
})

export default router