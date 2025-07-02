<script setup>
import { ref, onMounted } from 'vue'

const user = ref(JSON.parse(localStorage.getItem('user')))
const name = ref(user.value.name)
const email = ref(user.value.email)
const password = ref('')
const message = ref('')

// 🟢 Update profile on submit
const updateProfile = async () => {
    const updatedData = {
        name: name.value,
        email: email.value,
    }

    // Only send password if entered
    if (password.value.trim()) {
        updatedData.password = password.value
    }

    const res = await fetch(`http://localhost:3000/users/${user.value.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })

    if (res.ok) {
        const updatedUser = await res.json()
        localStorage.setItem('user', JSON.stringify(updatedUser))
        user.value = updatedUser
        message.value = '✅ Profile updated successfully!'
        password.value = ''
    } else {
        message.value = '❌ Failed to update profile.'
    }
}
</script>

<template>
    <div class="main-content">
        <h2>Edit Profile</h2>

        <form class="profile-form" @submit.prevent="updateProfile">
            <label>
                Name:
                <input type="text" v-model="name" required />
            </label>

            <label>
                Email:
                <input type="email" v-model="email" required />
            </label>

            <label>
                New Password:
                <input type="password" v-model="password" placeholder="Leave blank to keep current password" />
            </label>

            <button type="submit">Save Changes</button>
        </form>

        <p v-if="message" class="feedback-msg">{{ message }}</p>
    </div>
</template>

<style scoped>
.profile-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 400px;
    margin-top: 24px;
}

input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
}

button {
    padding: 10px;
    background-color: #0f0f0f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}

.feedback-msg {
    margin-top: 20px;
    color: green;
    background: #e8fbe7;
    border-left: 4px solid #28a745;
    padding: 10px 14px;
    border-radius: 4px;
}
</style>
