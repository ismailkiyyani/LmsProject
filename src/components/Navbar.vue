<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()

const theme = ref('light')

onMounted(() => {
    const saved = localStorage.getItem('theme') || 'light'
    theme.value = saved
    document.documentElement.setAttribute('data-theme', saved)
})

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
}

const logout = () => {
    localStorage.removeItem('user')
    router.push('/signin')
}
</script>

<template>
    <nav class="navbar">
        <div class="navbar-left">
            <h2 class="logo">LMS</h2>
        </div>

        <ul class="nav-links" :class="{ open: isOpen }">
            <li>
                <router-link to="/home" active-class="active-link" @click="isOpen = false">Home</router-link>
            </li>
            <li>
                <router-link to="/profile" active-class="active-link" @click="isOpen = false">Profile</router-link>
            </li>
            <li>
                <button @click="logout" class="logout-btn">Logout</button>
            </li>
            <li>
                <button class="theme-toggle" @click="toggleTheme">
                    {{ theme === 'dark' ? '☀️ Light' : '🌙 Dark' }}
                </button>
            </li>
        </ul>

        <div class="navbar-right">
            <button class="menu-toggle" @click="isOpen = !isOpen" aria-label="Toggle Menu">
                <span v-if="!isOpen">☰</span>
                <span v-else>✕</span>
            </button>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: var(--nav-bg);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    z-index: 1000;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    font-size: 1.75rem;
    font-weight: bold;
    letter-spacing: 1px;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 24px;
    align-items: center;
    flex: 1;
    justify-content: center;
    margin: 0;
    padding: 0;
}

.nav-links li {
    margin: 0;
}

.nav-links a,
.logout-btn,
.theme-toggle {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px 14px;
    border-radius: 6px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.nav-links a:hover,
.logout-btn:hover,
.theme-toggle:hover,
.nav-links a:focus,
.logout-btn:focus,
.theme-toggle:focus {
    background-color: var(--accent-color-hover);
    color: white;
    outline: none;
}

.active-link {
    font-weight: bold;
    background-color: var(--accent-color);
    color: white !important;
    border-radius: 4px;
}

.theme-toggle {
    background: var(--accent-color);
    color: white;
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 8px;
}

.menu-toggle {
    display: none;
    font-size: 24px;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
}

@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-links {
        flex-direction: column;
        width: 100%;
        display: none;
        margin-top: 12px;
        gap: 10px;
    }

    .nav-links.open {
        display: flex;
    }

    .nav-links li {
        width: 100%;
        text-align: center;
    }

    .nav-links a,
    .logout-btn,
    .theme-toggle {
        width: 100%;
        padding: 12px;
    }
}
</style>
