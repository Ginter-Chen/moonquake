
import MultiRangeSlider from "multi-range-slider-vue";
import Slider from '@vueform/slider'
import {reactive, computed} from 'vue';
import * as moment from 'moment';
export default {
  name: 'ui-time-slider',
  components: {
    MultiRangeSlider,
    Slider
  },
  props: {
    start: {
      type: String,
      default: '1970-07-21 00:00:00',
    },
    end:  {
      type: String,
      default: '1971-09-30 00:00:00',
    },
    maxT: {
      type: String,
      default: '1969-01-01 00:00:00',
    },
    maxE:  {
      type: String,
      default: '1977-12-31 23:59:59',
    }
  },
  setup(props, {emit}){
    let timeTransfer = (val) => {
      return Date.parse(val);
    }

    
    let step = reactive(1000*60);
    let barMinValue =  reactive(10);
    let startTime  = computed(() => Date.parse(props.maxT));
    console.log('props.maxT',startTime.value);

    let endTime = computed(() => Date.parse(props.maxE));
    console.log('props.endTime',endTime.value, props.maxE);
    
    

    // let transferRatioRange = (timeString) => {
    //   let _time = Date.parse(timeString);
    //   let unit = (endTime.value - startTime.value);
    //   let target = _time - startTime.value;
    //   let val = (target * 100 ) / unit
    //   return parseInt(val)
    //   // return 
    // }//end: transferRatioRange

    // let valueToDate = (val) => {
    //   let unit = (endTime.value - startTime.value);
    //   // let target = 

    // }
    const dateTimeHandle = (time, timeFormat = '', format = 'YYYY/MM/DD') => {
      return timeFormat === '' ? moment(time).format(format) : moment(time, timeFormat).format(format)
  }

    let convetTimeStampToDate = (timeStr) => {
      s = new Date(timeStr).toLocaleDateString("en-US")
      return s;
    }

    let timeStartDisplay = (t) => {
      let _t = t;
      // let s = new Date(_t).toString()
      let s = dateTimeHandle(new Date(_t), '', 'YYYY/MM/DD HH:mm:ss');
      return s;
    }

    let timeDisplay = reactive({
      start: timeStartDisplay(props.start),
      end: timeStartDisplay(props.end)
    });
   

    let value = reactive([timeTransfer(props.start), timeTransfer(props.end)]);

    // emit update 
    let onUpdateSlider = (event) => {
      timeDisplay.start = timeStartDisplay(event[0]);
      timeDisplay.end = timeStartDisplay(event[1]);
      console.log('onUpdateSlider',event, timeDisplay)
      emit('updateTime', {start:timeDisplay.start , end:timeDisplay.end })
    }

    // let format = (value) => {
    //     console.log(' format',value);
    //     return `€${Math.round(value)}`
    // }

    let datesFormat = (eve) => {
      // console.log('datesFormat')
      return 'ddd';
    }//end: datesFormat

    

   

    return{
      barMinValue,
      value,
      onUpdateSlider,
      step,
      startTime,
      endTime,
      datesFormat,
      convetTimeStampToDate,
      timeStartDisplay,
      timeDisplay,


    } // end:return
  }
}



