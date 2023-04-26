<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
    setup() {
        return { v$: useVuelidate({ $autoDirty: true }) }
    },
    data() {
        return {
            // removed unnecessary extra array to track services
            services: {
                serviceName: '',
                description: '',
                status: ''
            }
        }
    },
    methods: {
        // Create new service method
        async submitServiceForm() {
            // Checks to see if there are any errors in validation
            const isFormCorrect = await this.v$.$validate()
            // If no errors found. isFormCorrect = True then the form is submitted
            if (isFormCorrect) {
                axios
                    .post(`${apiURL}/services`, this.services)
                    .then(() => {
                        alert('Service has been added.')
                        this.$router.push({ name: 'service' })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    },
    // sets validations for the various data properties
    validations() {
        return {
            services: {
                serviceName: { required },
                status: { required }
            }
        }
    }
}
</script>

<!--Start of template for component-->
<template>
    <main>
        <div>
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
                Create New Service
            </h1>
        </div>
        <div class="px-10 py-20">
            <!-- @submit.prevent stops the submit event from reloading the page
            Start of form to create new service -->
            <form @submit.prevent="submitServiceForm">
                <!-- grid container -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                    <h2 class="text-2xl font-bold">Service Details</h2>

                    <!-- form field
                    Input box for service name -->
                    <div class="flex flex-col">
                        <label class="block">
                            <span class="text-gray-700">Service Name</span>
                            <span style="color: #ff0000">*</span>
                            <input type="text"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                v-model="services.serviceName" />
                            <span class="text-black" v-if="v$.services.serviceName.$error">
                                <p class="text-red-700" v-for="error of v$.services.serviceName.$errors" :key="error.$uid">
                                    {{ error.$message }}!
                                </p>
                            </span>
                        </label>
                    </div>
                    <!-- form field 
                    Options for service status using radio buttons-->
                    <div class="flex flex-col">
                        <label class="block">
                            <span class="text-gray-700">Status</span>
                            <span style="color: #ff0000">*</span>
                            <div>
                                <input type="radio" id="active" name="status" value="active" v-model="services.status"
                                    class="w-4 h-4  focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" />
                                <label for="active" class="ml-2">Active</label>
                            </div>
                            <div>
                                <input type="radio" id="inactive" name="status" value="inactive" v-model="services.status"
                                    class="w-4 h-4  focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" />
                                <label for="active" class="ml-2">Inactive</label>
                            </div>
                        </label>
                    </div>

                    <!-- form field 
                    Input box for service description -->
                    <div></div>
                    <div></div>

                    <div class="flex flex-col">
                        <label class="block">
                            <span class="text-gray-700">Description</span>
                            <textarea v-model="services.description"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                rows="2"></textarea>
                        </label>
                    </div>

                    <div></div>
                    <div></div>
                    <div></div>

                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                    <div class="flex justify-between mt-10 mr-20">
                        <button class="bg-red-700 text-white rounded"  type="submit">
                            Add New Service
                        </button>
                    </div>
                </div>
            </form>

            <div class="flex justify-between mt-10 mr-20">
                <button class="border border-red-700 bg-blue-700 text-white rounded" @click="$router.back()">
                        Go Back
                </button>
            </div>
        </div>
    </main>
</template>


<style>
button:hover {
    opacity: 0.5;
}
</style>
