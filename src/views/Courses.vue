<script setup>
import { ref, onMounted } from 'vue'

const courses = ref([])
const enrollments = ref([])
const user = JSON.parse(localStorage.getItem('user'))
const message = ref('')

onMounted(async () => {
    const [coursesRes, enrollmentsRes] = await Promise.all([
        fetch('http://localhost:3000/courses'),
        fetch(`http://localhost:3000/enrollments?userId=${user.id}`)
    ])
    courses.value = await coursesRes.json()
    enrollments.value = await enrollmentsRes.json()
})

const isEnrolled = (courseId) => {
    return enrollments.value.some(e => parseInt(e.courseId) === parseInt(courseId))
}

const enroll = async (courseId) => {
    if (isEnrolled(courseId)) {
        message.value = 'You are already enrolled in this course.'
        return
    }

    try {
        const res = await fetch('http://localhost:3000/enrollments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                courseId: parseInt(courseId)
            })
        })

        if (!res.ok) throw new Error('Enrollment failed')

        const newEnrollment = await res.json()
        enrollments.value.push(newEnrollment)
        const title = courses.value.find(c => c.id === courseId)?.title || 'Course'
        message.value = `🎉 Enrolled in "${title}"`
    } catch (err) {
        message.value = 'Something went wrong. Try again.'
    }
}
</script>

<template>
    <div class="main-content">
        <h2 class="heading">📚 Available Courses</h2>

        <p v-if="message" class="feedback-msg">{{ message }}</p>

        <div class="courses-grid">
            <div v-for="course in courses" :key="course.id" class="course-card">
                <h3>{{ course.title }}</h3>
                <p>{{ course.description }}</p>
                <button :disabled="isEnrolled(course.id)" @click="enroll(course.id)" class="enroll-btn">
                    {{ isEnrolled(course.id) ? '✅ Enrolled' : '➕ Enroll' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-content {
    max-width: 1000px;
    margin-left: 200px;
    padding: 24px;
}

.heading {
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: bold;
}

.feedback-msg {
    margin-bottom: 20px;
    color: green;
    font-weight: 600;
    background: #e7f8e5;
    padding: 10px 14px;
    border-left: 4px solid #28a745;
    border-radius: 4px;
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

.course-card {
    background: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.course-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.course-card h3 {
    margin: 0 0 10px;
    font-size: 20px;
}

.course-card p {
    font-size: 14px;
    color: #555;
    min-height: 48px;
}

.enroll-btn {
    margin-top: 16px;
    background-color: #0f0f0f;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.enroll-btn:hover {
    background-color: #222;
}

.enroll-btn:disabled {
    background-color: #888;
    cursor: not-allowed;
}
</style>
