
<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
    //Chart props to use data in the parent component to piechart
    props: {
        label: {
            type: Array
        },
        chartData: {
            type: Array
        }
    },
    mounted() {
        // Creating a variable to access color generator function
        const pieBackgroundColor = this.chartData.map(() => this.getColor())
        // Pie chart component
        new Chart(this.$refs.myChart, {
            type: 'doughnut',
            data: {
                labels: this.label,
                datasets: [
                    {
                        data: this.chartData,
                        backgroundColor: pieBackgroundColor
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        }
        );
    },

    methods: {
        // apply color randomized function
        getColor() {
            let channel = () => Math.random() * 255
            return `rgba(${channel()}, ${channel()}, ${channel()}, 0.8)`
        }
    }
}
</script>

<template>
    <div class="shadow-lg rounded-lg h-96">
        <canvas id="p-10" ref="myChart"></canvas>
    </div>
</template>

