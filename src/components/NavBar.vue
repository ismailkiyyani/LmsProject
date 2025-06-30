<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()

const logout = () => {
    localStorage.removeItem('user')
    router.push('/signin')
}
</script>
<template>
    <nav class="navbar">
        <div class="navbar-left">
            <h2 class="logo">WWE</h2>
        </div>

        <ul class="nav-links" :class="{ open: isOpen }">
            <li><router-link to="/home" active-class="active-link" @click="isOpen = false">Home</router-link></li>
            <li><router-link to="/profile" active-class="active-link" @click="isOpen = false">Profile</router-link></li>
            <li><button @click="logout" class="logout-btn">Logout</button></li>
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
    background-color: #0f0f0f;
    color: white;
    padding: 12px 24px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.navbar-left,
.navbar-right {
    flex: 0 0 auto;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

/* Nav links */
.nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    flex: 1;
}

.nav-links li {
    margin: 0;
}

.nav-links a,
.logout-btn {
    color: white;
    text-decoration: none;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 5px;
}

.nav-links a:hover,
.logout-btn:hover {
    background-color: white;
    color: #007bff;
}

.active-link {
    font-weight: bold;
    border-bottom: 2px solid white;
}

/* Toggle */
.menu-toggle {
    display: none;
    font-size: 24px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-links {
        flex-direction: column;
        display: none;
        width: 100%;
        margin-top: 16px;
    }

    .nav-links.open {
        display: flex;
    }

    .nav-links li {
        margin-top: 10px;
        text-align: center;
    }
}
</style>
