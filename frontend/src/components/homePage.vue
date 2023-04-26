<script>
import { DateTime } from 'luxon'
import axios from 'axios'
import AttendanceChart from './barChart.vue'
import ClientChart from './pieChart.vue'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  components: {
    AttendanceChart,
    ClientChart
  },
  data() {
    return {
      recentEvents: [],
      labels: [],
      chartData: [],
      loading: false,
      pieLoading: false,
      error: null,
      pielabels: [],
      pieData: []
    }
  },
  mounted() {
    this.getAttendanceData(),
    // Mounting the function so it loads the data if the user goes to the page
    this.clientByZip()
  },
  methods: {
    // Get attendance from API
    async getAttendanceData() {
      try {
        this.error = null
        this.loading = true
        const response = await axios.get(`${apiURL}/events/attendance`)
        this.recentEvents = response.data
        this.labels = response.data.map(
          (item) => `${item.name} (${this.formattedDate(item.date)})`
        )
        this.chartData = response.data.map((item) => item.attendees.length)
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: 'Server Response',
            message: err.message
          }
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: 'Unable to Reach Server',
            message: err.message
          }
        } else {
          // There's probably an error in your code
          this.error = {
            title: 'Application Error',
            message: err.message
          }
        }
      }
      this.loading = false
    },

    // Get clients by zipcode function
    async clientByZip() {
      try {
        const res = await axios.get(`${apiURL}/clients/zip`)
        this.pieLoading = true
        this.pielabels = res.data.map((zip) => zip._id)
        this.pieData = res.data.map((num) => num.count)
        console.log(this.pielabels)
      } catch(err) {
        console.log(err)
      }
    },

    // Formatting date for barchart
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    // method to allow click through table to event details
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
  }
}
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Welcome
      </h1>
      <br />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <!--Table section to show event detail and attendees-->
        <div class="ml-10"></div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Number of Attendees</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editEvent(event._id)"
                v-for="event in recentEvents"
                :key="event._id"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.attendees.length }}</td>
              </tr>
            </tbody>
          </table>

          <!--Attendace chart section-->
          <div>
            <AttendanceChart
              v-if="!loading && !error"
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="text-6xl font-bold text-center text-gray-500 animate-pulse"
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
          </div>
          <!--End of Attendance chart-->

          <!--Table for zip and number of clients-->
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Zip Code</th>
                <th class="p-4 text-left">Number of Clients</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
              v-for="zips, i in pielabels"
              >
                <td class="p-2 text-left">{{ zips }}</td>
                <td class="p-2 text-left">{{ pieData[i] }}</td>
              </tr>
            </tbody>
          </table>
          <!--Client by zip pie chart section-->
          <div>
            <ClientChart
            v-if="pieLoading"
              :label="pielabels"
              :chart-data="pieData">
            </ClientChart>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


