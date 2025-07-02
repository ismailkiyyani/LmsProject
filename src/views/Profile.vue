<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProgressChart from '@/components/ProgressChart.vue'

const router = useRouter()
const enrolledCourses = ref([])
const allCourses = ref([])
const progressPercent = ref(0)

const user = JSON.parse(localStorage.getItem('user'))

onMounted(async () => {
    const [enrollmentsRes, coursesRes] = await Promise.all([
        fetch(`http://localhost:3000/enrollments?userId=${user.id}`),
        fetch('http://localhost:3000/courses')
    ])

    const enrollments = await enrollmentsRes.json()
    allCourses.value = await coursesRes.json()

    const courses = await Promise.all(
        enrollments.map(e =>
            fetch(`http://localhost:3000/courses/${e.courseId}`).then(res => res.json())
        )
    )

    enrolledCourses.value = enrollments.map((e, i) => ({
        ...e,
        course: courses[i]
    }))

    progressPercent.value = Math.round((enrolledCourses.value.length / allCourses.value.length) * 100)
})

const discard = async (enrollmentId) => {
    await fetch(`http://localhost:3000/enrollments/${enrollmentId}`, {
        method: 'DELETE'
    })
    enrolledCourses.value = enrolledCourses.value.filter(e => e.id !== enrollmentId)
    progressPercent.value = Math.round((enrolledCourses.value.length / allCourses.value.length) * 100)
}

const goToSettings = () => {
    router.push('/settings')
}
</script>

<template>
    <div class="main-content">
        <!-- 👤 User Info -->
        <div class="profile-header">
            <div class="user-info">
                <h2>{{ user.name }}</h2>
                <p>{{ user.email }}</p>
            </div>
            <button @click="goToSettings">Edit Profile</button>
        </div>

        <!-- 📊 Progress -->
        <div class="progress-section" v-if="allCourses.length">
            <div class="progress-stats">
                <p>Progress: {{ enrolledCourses.length }} / {{ allCourses.length }} ({{ progressPercent }}%)</p>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
                </div>
            </div>
            <div class="chart-box">
                <ProgressChart :enrolledCount="enrolledCourses.length" :totalCount="allCourses.length" />
            </div>
        </div>

        <!-- 📘 Enrolled Courses -->
        <h3 style="margin-top: 32px;">Your Enrolled Courses</h3>
        <div v-if="enrolledCourses.length" class="courses-grid">
            <div v-for="item in enrolledCourses" :key="item.id" class="course-card">
                <h4>{{ item.course.title }}</h4>
                <p>{{ item.course.description }}</p>
                <button @click="discard(item.id)">Discard</button>
            </div>
        </div>
        <p v-else class="empty">You haven't enrolled in any courses yet.</p>
    </div>
</template>

<style scoped>
.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f0f0f0;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
}

.user-info h2 {
    margin: 0 0 4px;
    font-size: 22px;
}

.user-info p {
    margin: 0;
    color: #555;
}

button {
    padding: 8px 16px;
    background-color: #0f0f0f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.progress-section {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
    margin-bottom: 32px;
}

.progress-stats {
    flex: 1;
    min-width: 220px;
}

.progress-bar {
    width: 100%;
    height: 20px;
    background-color: #e4e4e4;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 8px;
}

.progress-fill {
    height: 100%;
    background-color: #0f0f0f;
    width: 0;
    transition: width 0.4s ease-in-out;
}

.chart-box {
    width: 300px;
    min-width: 200px;
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
}

.course-card {
    background: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.course-card h4 {
    margin: 0 0 10px;
}

.course-card p {
    color: #444;
    font-size: 14px;
    min-height: 48px;
}

.course-card button {
    margin-top: 12px;
    padding: 6px 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.empty {
    color: #777;
    font-style: italic;
}
</style>
