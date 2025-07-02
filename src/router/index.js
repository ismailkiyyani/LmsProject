import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Courses from '../views/Courses.vue'
import Settings from '../views/Settings.vue'

const routes = [
    { path: '/', redirect: '/signup' },

    // 🛡️ Guest-only routes
    { path: '/signup', component: SignUp, meta: { requiresGuest: true } },
    { path: '/signin', component: SignIn, meta: { requiresGuest: true } },

    // 🔐 Auth-only routes
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/courses', component: Courses, meta: { requiresAuth: true } },
    { path: '/settings', component: Settings, meta: { requiresAuth: true } },

    // 🔄 Fallback route
    { path: '/:pathMatch(.*)*', redirect: '/home' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('user')

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/signin') // redirect if not logged in
    } else if (to.meta.requiresGuest && isLoggedIn) {
        next('/home') // prevent guest access when logged in
    } else {
        next()
    }
})

export default router
