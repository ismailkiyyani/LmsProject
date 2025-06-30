<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()

const signIn = async () => {
    try {
        console.log(email.value, "__", password.value);

        const { data } = await axios.get(`http://localhost:3000/users?email=${email.value}&password=${password.value}`)
        console.log(data);
        sessionStorage.setItem('justLoggedIn', 'true')
        if (data.length === 1) {
            localStorage.setItem('user', JSON.stringify(data[0]))
            sessionStorage.setItem('justLoggedIn', 'true') // ✅ this line
            message.value = 'Login successful! Redirecting...'
            setTimeout(() => router.push('/home'), 1000)
        }
        else {
            message.value = 'Invalid name or password'
        }
    } catch (error) {
        message.value = 'Server error. Please try again later.'
        console.error(error)
    }
}
</script>

<template>
    <div class="signin-container">
        <h1>Sign In</h1>

        <label>
            Enter Your Email
            <input type="text" v-model="email" />
        </label>

        <label>
            Password
            <input type="password" v-model="password" />
        </label>

        <button @click="signIn">Sign In</button>

        <p style="color: red;">{{ message }}</p>

        <p>
            Don't have an account?
            <router-link to="/signup">Sign Up</router-link>
        </p>
    </div>
</template>

<style scoped>
.signin-container {
    max-width: 400px;
    margin: 80px auto;
    padding: 40px 30px;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
    font-family: Arial, sans-serif;
    background-color: #fff;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 24px;
}

label {
    display: block;
    margin-bottom: 16px;
    font-size: 14px;
    color: #444;
}

input {
    width: 100%;
    padding: 10px;
    margin-top: 6px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    margin-top: 12px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

p {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
}

a {
    color: #007bff;
    text-decoration: none;
    margin-left: 5px;
}

a:hover {
    text-decoration: underline;
}
</style>
