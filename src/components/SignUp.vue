<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const message = ref('')

const signUp = async () => {
    const { data } = await axios.get(`http://localhost:3000/users?email=${email.value}`)

    if (data.length > 0) {
        message.value = 'User already exists!'
        return
    }

    await axios.post('http://localhost:3000/users', {
        name: name.value,
        email: email.value,
        password: password.value
    })

    message.value = 'Signup successful! Redirecting to Sign In...'
    setTimeout(() => router.push('/signin'), 1500)
}
</script>

<template>
    <div class="signup-container">
        <h1>Sign Up</h1>
        <input v-model="name" placeholder="Name" />
        <input v-model="email" placeholder="Email" />
        <input v-model="password" placeholder="Password" type="password" />
        <button @click="signUp">Sign Up</button>
        <p>{{ message }}</p>
        <p>Already have an account? <router-link to="/signin">Sign In</router-link></p>
    </div>
</template>

<style scoped>
.signup-container {
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