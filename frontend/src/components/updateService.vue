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
    created() {
        axios.get(`${apiURL}/services/id/${this.$route.params.id}`).then((res) => {
            this.services = res.data
        })
    },
    methods: {
        handleServiceUpdate() {
            axios.put(`${apiURL}/services/update/${this.$route.params.id}`, this.services).then(() => {
                alert('Update has been saved.')
                this.$router.back()
            })
        },
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
                Update Service
            </h1>
        </div>
        <div class="px-10 py-20">
            <!-- @submit.prevent stops the submit event from reloading the page-->
            <form @submit.prevent="handSubmitForm">
                <!-- grid container -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                    <h2 class="text-2xl font-bold">Service Details</h2>

                    <!-- form field -->
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
                    <!-- form field -->
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

                    <!-- form field -->
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
                        <button class="bg-red-700 text-white rounded" @click="handleServiceUpdate" type="submit">
                            Update Service
                        </button>
                    </div>
                    <div class="flex justify-between mt-10 mr-20">
                        <button type="button" class="border border-red-700 bg-blue-700 text-white rounded" @click="$router.back()">
                            Go Back
                        </button>
                    </div>
                    <div class="flex justify-between mt-10 mr-20">
                        <button class="bg-orange-700 text-white rounded" type="reset">
                            Clear Form
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>