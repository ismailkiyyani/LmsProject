<script setup>
import { Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { reactive, watch } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
    enrolledCount: Number,
    totalCount: Number
})

const chartData = reactive({
    labels: ['Enrolled', 'Remaining'],
    datasets: [
        {
            data: [props.enrolledCount, props.totalCount - props.enrolledCount],
            backgroundColor: ['#0f0f0f', '#ccc']
        }
    ]
})

watch(
    () => [props.enrolledCount, props.totalCount],
    ([newEnrolled, newTotal]) => {
        chartData.datasets[0].data = [newEnrolled, newTotal - newEnrolled]
    }
)

const options = {
    responsive: true,
    plugins: {
        legend: { position: 'bottom' },
        title: {
            display: true,
            text: 'Course Enrollment Progress'
        }
    }
}
</script>

<template>
    <Pie :data="chartData" :options="options" />
</template>
