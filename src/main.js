import { createApp } from 'vue'
import Vue from "vue";
import VueApexCharts from "vue3-apexcharts";
import App from './App.vue'
import { router } from './router';
// import "vue-time-slider/dist/timeslider.css"


createApp(App).use(VueApexCharts).use(router).mount('#app')
