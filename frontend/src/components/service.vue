<template>
  <div class="row justify-content-center">
    <div class="title-hd">
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        List of Services
      </h1>
    </div>
    <!-- Start of table to display different available services -->
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Service Name</th>
          <th>Description</th>
          <th>Status</th>
          <th v-if="user.role === 'editor'">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in servicesData" :key="service._id">
          <td>{{ service.serviceName }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.status }}</td>
          <td v-if="user.role === 'editor'">
            <button
              @click.prevent="updateItem(service._id)"
              class="btn btn-success mx-2"
            >
              Edit
            </button>
            <button
              v-if="service.status === 'active'"
              @click.prevent="deactiveStatus(service._id)"
              class="btn btn-danger mx-2"
            >
              Deactivate
            </button>
            <button
              v-if="service.status === 'inactive'"
              @click.prevent="activeStatus(service._id)"
              class="btn btn-success mx-2"
            >
              Activate
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row justify-content-center">
    <div>
      <button
        class="btn btn-danger mx-2"
        v-if="user.role === 'editor'"
        type="button"
        @click="$router.push('createservice')"
      >
        New Service
      </button>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { userLoggedIn } from '@/store/userLoggedIn'

export default {
  setup() {
    const user = userLoggedIn()
    return {
      user
    }
  },
  data() {
    return {
      listOfServices: [],
      id: '',
      servicesData: [],
      newItem: {
        id: null,
        service: '',
        description: ''
      },
      active: 'active',
      inactive: 'inactive'
    }
  },
  created() {
    axios.get(`${apiURL}/services`).then((res) => {
      this.servicesData = res.data
    })
  },
  methods: {
    // deleteItem(id) {
    //   let deleteURL = `${apiURL}/services/${id}`
    //   //let indexofArrayItem = this.servicesData.findIndex(i => i._id === id);

    //   if (window.confirm('Do you really want to delete?')) {
    //     axios
    //       .delete(deleteURL)
    //       .then((res) => {
    //         location.reload()
    //       })
    //       .catch((error) => {
    //         console.log(error) // log errors
    //       })
    //   }
    // },
    updateItem(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } })
    },

    // Sets the service status to active
    async activeStatus(serviceID) {
      try {
        await axios.put(`${apiURL}/services/status/${serviceID}/${this.active}`)
        // reloads the page
        location.reload()
      } catch (error) {
        // log any errors
        console.log(error)
      }
    },

    async deactiveStatus(serviceID) {
      try {
        await axios.put(
          `${apiURL}/services/status/${serviceID}/${this.inactive}`
        )

        location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  },
  validations: {
    name: {
      required
    },
    status: {
      required
    }
  }
}
</script>

<style>
.title-hd {
  padding-bottom: 50px;
}

.row.justify-content-center {
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
}

.btn.btn-danger.mx-2 {
  background-color: #c8102e;
}

.btn.btn-danger.mx-2:hover {
  opacity: 0.5;
}
</style>
