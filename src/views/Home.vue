<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()
const user = ref(null)
const showWelcome = ref(false)

const logout = () => {
    localStorage.removeItem('user')
    router.push('/signin')
}

onMounted(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
        user.value = JSON.parse(storedUser)

        // ✅ Show welcome message only if just logged in
        if (sessionStorage.getItem('justLoggedIn') === 'true') {
            showWelcome.value = true
            sessionStorage.removeItem('justLoggedIn')

            setTimeout(() => {
                showWelcome.value = false
            }, 5000)
        }
    } else {
        router.push('/signin')
    }
})
</script>


<template>
    <div class="home-container">
        <NavBar v-if="!showWelcome" />
        <template v-if="user">
            <h1 v-if="showWelcome">Welcome, {{ user.name }}!</h1>
            <button v-if="showWelcome" @click="logout">Logout</button>
        </template>
        <p v-else>Redirecting to sign in...</p>
    </div>
</template>

<style scoped>
.home-container {
    text-align: center;
    margin-top: 100px;
    font-family: Arial, sans-serif;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #d9363e;
}
</style>
