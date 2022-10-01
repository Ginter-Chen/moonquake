import { createApp } from 'vue'
import Vue from "vue";
import VueApexCharts from "vue3-apexcharts";
import App from './App.vue'
import { router } from './router';
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import "vue-time-slider/dist/timeslider.css"


createApp(App).use(Antd).use(VueApexCharts).use(router).mount('#app')
