
import moment from 'moment';
import VueApexCharts from "vue3-apexcharts";
import {reactive, ref} from 'vue';
import YearMonthData from '@/assets/json/event_count.json';
import AllEventData from '@/assets/json/all_event.json'
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
    // dataYearMonth:{
    //   type: Array,
    //   default() {
    //     return [{
    //       year: 1969,
    //       count: 20,
    //       months:[10,20,30,40,50,60,5,18,9,43,22,18]
    //     },{
    //       year: 1970,
    //       count: 120,
    //       months:[10,20,30,40,50,60,5,18,9,43,22,18],
    //     },
    //     {
    //       year: 1971,
    //       count: 120,
    //       months:[10,20,30,40,50,60,5,18,9,43,22,18]
    //     }]
    //   }
    // },

  },
  setup(props, {emit}){

    let dataYearMonth = reactive(YearMonthData);
    let totalEventYear = ref(0); // 十年總共的event
    let dataMonth = reactive({
      months: [],
      total: 0,
    }); // 該年的12個月的資料
    let datas = reactive({
      selectedY: -1,
      selectedM: -1,
      selectedD: -1,
      allEvents: [],
      series: [],
    })
    let test = [];

    //series
    // let series = reactive([{
    //       name: '1',
    //       data: [
    //         {
    //           x: 'Event',
    //           y: [
    //             Date.parse('1969-07-27 23:48:00'),
    //             Date.parse('1969-07-29 00:40:00')
    //           ]
    //         },
    //       ]
    //     },
    //     {
    //       name: '2',
    //       data: [
    //         {
    //           x: 'Event',
    //           y: [
    //             Date.parse('1969-07-27 23:48:00'),
    //             Date.parse('1969-07-31 00:40:00')
    //           ]
    //         },
    //       ]
    //     }])

    dataYearMonth.forEach(itm => {
      console.log('itm', itm);
      totalEventYear.value = totalEventYear.value + itm.count;
      console.log('totalEventYear',totalEventYear.value)

    })//end: forEach

    // allEvents
    AllEventData.forEach(item => {
      datas.allEvents.push({
        id: item.id,
        start: item.start,
        end: item.end,
        type: item.type,
        year: item.year,
        month: item.month,
        day: item.day,
      })
    })

    // console.log('AllEventData',datas.allEvents[0])
    // console.log('dataUearMonth',dataYearMonth);

    let viewLayer = ref('YEAR');  // YEAR, MONTH, DAY

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
    });
    
    let clickHandler = (event, chartContext, config) => {
      emit('onClick', _index)
    }

    let changeView = (type) => {
      viewLayer.value = type;
    }

    // year view 
    let yearsList = []

    let getYearMonthData = (year) => {
      let _arr = [];

      _arr = dataYearMonth.filter(itm => itm.year === year).map(target => target.months)[0];
      console.log('_arr',_arr)
      dataMonth.months =  [..._arr]
      _arr.forEach(target => {
        console.log('target',target)
        dataMonth.total = dataMonth.total + target;
      })
      console.log('dataMonth',dataMonth);
    }

    let getDayData = (y, m) => {
      const _year = y;
      const _month = m;
      console.log('getDayData', _year, _month)
      let _data = datas.allEvents.filter(itm => itm.year === _year && itm.month === _month )
      console.log('_data',_data)
      let _tempArr = []
      //series
      datas.series = [];
      _data.forEach(itm => {
        _tempArr.push({
          x: 'Event',
          y: [
            Date.parse(itm.start),
            Date.parse(itm.end)
          ]
        })
      })

      let _temp = [{name: 0, data: [..._tempArr]}]
      datas.series = [..._temp];
     
      console.log('data.series',datas.series);
      //end of series

    } // getDayData

    let goToDetail = (type, selected) => {
      if(type === 'YEAR'){
        getYearMonthData(selected);
        changeView('MONTH');
        datas.selectedY = selected;
      } 
      else{
        datas.selectedM = selected;
        getDayData(datas.selectedY,  datas.selectedM);
        // setTimeout(()=>{
          changeView('DAY');
        // },100)
      }
    }//end: goToDetail
    
    return{
      chartOptions,
      clickHandler,
      viewLayer,
      changeView,
      dataYearMonth,
      totalEventYear,
      dataMonth,
      goToDetail,
      datas,
      // series,
      test,
      
    }
  }
}


