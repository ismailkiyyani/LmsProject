import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import Home from '../views/Home.vue'

const routes = [
    { path: '/', redirect: '/signup' },

    // 🛡️ Guest-only routes
    { path: '/signup', component: SignUp, meta: { requiresGuest: true } },
    { path: '/signin', component: SignIn, meta: { requiresGuest: true } },

    // 🔐 Auth-only route
    { path: '/home', component: Home, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('user')

    if (to.meta.requiresAuth && !isLoggedIn) {
        // Not logged in? Redirect to Sign In
        next('/signin')
    } else if (to.meta.requiresGuest && isLoggedIn) {
        // Already logged in? Redirect to Home
        next('/home')
    } else {
        // Access allowed
        next()
    }
})

export default router
