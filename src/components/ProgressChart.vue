<script setup>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Chart } from 'vue-chartjs'
import { computed, watch } from 'vue'

// Register only needed Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
    enrolledCount: Number,
    totalCount: Number
})

// Dynamically compute chart data based on props
const chartData = computed(() => ({
    labels: ['Enrolled', 'Remaining'],
    datasets: [
        {
            data: [props.enrolledCount, props.totalCount - props.enrolledCount],
            backgroundColor: ['#z', '#e0e0e0'], // Green & Grey
            borderWidth: 1
        }
    ]
}))

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Course Enrollment Progress'
        },
        animation: {
            duration: 800,
            easing: 'easeOutCubic'
        }

    }
}
</script>

<template>
    <Chart type="pie" :data="chartData" :options="chartOptions" />
</template>
<style scoped></style>