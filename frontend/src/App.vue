<script>
import { BTable } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { userLoggedIn } from '@/store/userLoggedIn'


export default {
  name: 'App',
  setup() {
    const user = userLoggedIn();
    return { user };
  },
  data() {
    return {
      // Fallback orgname
      orgName: 'Dataplatform',
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.orgname
    })
  },
  setup() {
    const user = userLoggedIn();
    return {
      user
    }
  },
  methods: {
    formatName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
}
</script>

<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
          <h3 v-if="user.isLoggedIn">Welcome, {{  formatName(user.username) }}</h3>
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <!--Add v-if component to login route link to check if user is logged in
              and change login route to logout-->
            <li>
              <router-link to="/login" v-if="!user.isLoggedIn">
                <span style="position: relative; top: 6px" class="material-icons">login</span>
                Login
              </router-link>
              <router-link to="/" v-if="user.isLoggedIn" v-on:click="user.logout()">
                <span style="position: relative; top: 6px" class="material-icons">logout</span>
                Logout
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/findclient" v-if="user.isLoggedIn">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/findevents" v-if="user.isLoggedIn">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
            <li>
              <router-link to="/service" v-if="user.isLoggedIn">
                <span style="position: relative; top: 6px" class="material-icons">list</span>
                Services
              </router-link>
            </li>
            <li>
              <router-link to="/intakeform" v-if="user.isLoggedIn && user.role ==='editor'">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Client Intake Form
              </router-link>
            </li>
            <li>
              <router-link to="/eventform" v-if="user.isLoggedIn && user.role ==='editor'">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)">
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
