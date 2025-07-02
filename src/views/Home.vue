<script setup>
import { ref, onMounted } from 'vue'

const user = JSON.parse(localStorage.getItem('user'))
const enrolledCourses = ref([])

onMounted(async () => {
    const res = await fetch(`http://localhost:3000/enrollments?userId=${user.id}&_expand=course`)
    enrolledCourses.value = await res.json()
})

const name = user?.name || 'Student'

// Fake completed count (you can add real data later)
const completedCourses = ref(1)
</script>

<template>
    <div class="dashboard">
        <!-- 👋 Welcome -->
        <h2>Welcome back, {{ name }} 👋</h2>

        <!-- 📊 Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <h3>{{ enrolledCourses.length }}</h3>
                <p>Courses Enrolled</p>
            </div>
            <div class="stat-card">
                <h3>{{ completedCourses }}</h3>
                <p>Courses Completed</p>
            </div>
            <div class="stat-card">
                <h3>
                    {{
                        enrolledCourses.length
                            ? Math.floor((completedCourses / enrolledCourses.length) * 100)
                            : 0
                    }}%
                </h3>
                <p>Progress</p>
            </div>
        </div>

        <!-- 📈 Progress bar -->
        <div class="progress-section">
            <label>Overall Progress</label>
            <div class="progress-bar">
                <div class="progress-fill"
                    :style="{ width: enrolledCourses.length ? (completedCourses / enrolledCourses.length) * 100 + '%' : '0%' }">
                </div>
            </div>
        </div>

        <!-- 🕓 Recent Enrollments -->
        <div class="recent-section">
            <h3>Recently Enrolled</h3>
            <ul class="course-list">
                <li v-for="item in enrolledCourses.slice(-3).reverse()" :key="item.id" class="course-card">
                    <h4>{{ item.course.title }}</h4>
                    <p>{{ item.course.description }}</p>
                </li>
            </ul>
        </div>

        <!-- 🚀 Quick Actions -->
        <div class="quick-actions">
            <router-link to="/profile" class="action-btn">🎓 My Courses</router-link>
            <router-link to="/courses" class="action-btn">➕ Enroll New</router-link>
            <router-link to="/settings" class="action-btn">⚙️ Settings</router-link>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.stats-grid {
    display: flex;
    gap: 20px;
    margin: 20px 0;
    flex-wrap: wrap;
}

.stat-card {
    background: #111;
    color: #fff;
    flex: 1;
    min-width: 160px;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.progress-section {
    margin: 20px 0;
}

.progress-bar {
    width: 100%;
    height: 18px;
    background: #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 6px;
}

.progress-fill {
    height: 100%;
    background: #2ecc71;
    transition: width 0.4s ease;
}

.recent-section {
    margin-top: 30px;
}

.course-list {
    list-style: none;
    padding: 0;
}

.course-card {
    background: #f4f4f4;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.quick-actions {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.action-btn {
    background: #0f0f0f;
    color: white;
    padding: 10px 16px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.3s;
}

.action-btn:hover {
    background: #222;
}
</style>
