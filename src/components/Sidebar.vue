<script setup>
import { ref } from 'vue'

const isOpen = ref(true)
</script>

<template>
    <aside class="sidebar" :class="{ closed: !isOpen }">
        <button class="toggle-btn" @click="isOpen = !isOpen">
            {{ isOpen ? '←' : '→' }}
        </button>
        <ul class="menu">
            <li>
                <router-link to="/courses" active-class="active-link">
                    📚 <span v-if="isOpen">All Courses</span>
                </router-link>
            </li>
            <li>
                <router-link to="/profile" active-class="active-link">
                    🎓 <span v-if="isOpen">My Courses</span>
                </router-link>
            </li>
            <li>
                <router-link to="/settings" active-class="active-link">
                    ⚙️ <span v-if="isOpen">Settings</span>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<style scoped>
:root {
    --sidebar-bg: #1e1e2f;
    /* Dark background */
    --text-color: #f5f5f5;
    --highlight-color: #4cafef;
    /* Active link highlight */
    --hover-bg: rgba(255, 255, 255, 0.1);
    --toggle-bg: #4cafef;
}

.sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 220px;
    height: calc(100% - 60px);
    background-color: var(--sidebar-bg);
    padding: 20px 10px;
    color: var(--text-color);
    transition: width 0.3s ease;
    z-index: 999;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.sidebar.closed {
    width: 60px;
}

.toggle-btn {
    background-color: var(--toggle-bg);
    color: #fff;
    border: none;
    padding: 8px 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease;
}

.toggle-btn:hover {
    background-color: #369edb;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu li {
    margin-bottom: 10px;
}

.menu a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-color);
    text-decoration: none;
    padding: 10px 12px;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.menu a:hover {
    background-color: var(--hover-bg);
}

.menu a.active-link {
    background-color: var(--highlight-color);
    color: #07090993;
}

.sidebar.closed .toggle-btn {
    width: 100%;
    text-align: center;
}

.sidebar.closed .menu a {
    justify-content: center;
    padding: 10px 0;
}

.sidebar.closed .menu a span {
    display: none;
    /* Hide labels */
}

.sidebar.closed:hover {
    width: 220px;
}

.sidebar.closed:hover .menu a span {
    display: inline;
    /* Show labels on hover */
}
</style>
