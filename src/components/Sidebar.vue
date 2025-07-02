<script setup>
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
    <aside class="sidebar" :class="{ closed: !isOpen }">
        <button class="toggle-btn" @click="isOpen = !isOpen">
            {{ isOpen ? '←' : '→' }}
        </button>
        <ul v-show="isOpen">
            <li><router-link to="/courses" active-class="active-link">📚 All Courses</router-link></li>
            <li><router-link to="/profile" active-class="active-link">🎓 My Courses</router-link></li>
            <li><router-link to="/settings" active-class="active-link">⚙️ Settings</router-link></li>
        </ul>
    </aside>
</template>

<style scoped>
.sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 200px;
    height: calc(100% - 60px);
    background-color: var(--sidebar-bg);
    padding: 20px;
    color: var(--text-color);
    transition: width 0.3s;
    z-index: 999;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.sidebar.closed {
    width: 60px;
}

.toggle-btn {
    background: var(--accent-color);
    border: none;
    color: white;
    cursor: pointer;
    font-size: 18px;
    padding: 6px 12px;
    border-radius: 6px;
    margin-bottom: 16px;
    transition: background 0.3s ease;
}

.toggle-btn:hover {
    background-color: var(--accent-color-hover, #222);
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar li {
    margin-bottom: 12px;
}

.sidebar a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    display: block;
    padding: 10px;
    border-radius: 6px;
    transition: background 0.2s ease, color 0.2s ease;
}

.sidebar a:hover,
.sidebar a.active-link {
    background-color: var(--active-link-bg);
    color: var(--text-color);
    font-weight: bold;
}
</style>
