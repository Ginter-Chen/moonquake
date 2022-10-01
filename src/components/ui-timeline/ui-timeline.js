
import moment from 'moment';
import VueApexCharts from "vue3-apexcharts";
import {reactive} from 'vue';
export default {
  name: 'ui-timeline',
  components: {
    VueApexCharts
  },
  props: {
    series:{
      type: Object,
      default() {
        return [{
          name: '1',
          data: [
            {
              x: 'Event',
              y: [
                Date.parse('1969-07-27 23:48:00'),
                Date.parse('1969-07-29 00:40:00')
              ]
            },
          ]
        },
        {
          name: '2',
          data: [
            {
              x: 'Event',
              y: [
                Date.parse('1969-07-27 23:48:00'),
                Date.parse('1969-07-31 00:40:00')
              ]
            },
          ]
        },]
      },
    },
  },
  setup(props, {emit}){
    let chartOptions = reactive({
      chart: {
        height: 200,
        type: 'rangeBar',
        selection: {
          enabled: true,
          type: 'x',
          fill: {
            color: '#24292e',
            opacity: 0.1
          },
          stroke: {
            width: 1,
            dashArray: 3,
            color: '#24292e',
            opacity: 0.4
          },
        },
        stroke: {
          width: 10,
          dashArray: 3,
          color: '#24292e',
          opacity: 0.4
        },

        markers: {
          size: 10,
          colors: 'red',
          strokeColors: '#fff',
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
      },
      },
     
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      // dataLabels: {
      //   enabled: true,
      //   formatter: function(val) {
      //     var a = moment(val[0])
      //     var b = moment(val[1])
      //     var diff = b.diff(a, 'days')
      //     return diff + (diff > 1 ? ' days' : ' day')
      //   }
      // },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      xaxis: {
        type: 'datetime'
      },
      legend: {
        position: 'top',
        show: false,
      },
      zoom: {
        enabled: true,
        type: 'x',  
        autoScaleYaxis: false, 
      }
    });
    
    let clickHandler = (event, chartContext, config) => {
      let _index = config.seriesIndex;
      emit('onClick', _index)
    }
    // let series = reactive([
    //   {
    //     name: '1',
    //     data: [
    //       {
    //         x: 'Event',
    //         y: [
    //           Date.parse('1969-07-27 23:48:00'),
    //           Date.parse('1969-07-29 00:40:00')
    //         ]
    //       },
    //     ]
    //   },
    //   {
    //     name: '2',
    //     data: [
    //       {
    //         x: 'Event',
    //         y: [
    //           Date.parse('1969-07-28 11:46:00'),
    //           Date.parse('1969-07-28 12:15:00')
    //         ]
    //       },
    //     ]
    //   }
    // ])
    return{
      chartOptions,
      // series,
      clickHandler,

    }
  }
}


