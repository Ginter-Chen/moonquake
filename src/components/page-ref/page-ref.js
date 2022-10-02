
import {reactive} from 'vue';
export default {
  name: 'page-ref',
  components: {},
  props: [],
  setup(){
    let datas = reactive([{
      name: 'Apollo seismic event catalog',
      link: 'https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/data/',
    },{
      name: 'The description of Apollo Seismic Experiments:',
      link: 'https://www.darts.isas.jaxa.jp/planet/seismology/apollo/The_Description_of_Apollo_Seismic_Experiments.pdf',
    },
    {
      name: 'Photo:',
      link: 'https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=4720',
    },
    {
      name: 'Lunar seismology background::',
      link: 'https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/document/lunar_seismology_background.pdf',
    },
    {
      name: 'Code:',
      link: 'https://codepen.io/prisoner849/pen/oNopjyb'
    }]);

    let license =  reactive([{
      name: 'Three.js',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/@types/three',
    },
    {
      name: '@vueform/slider',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/@vueform/slider',
    },
    {
      name: 'ant-design-vue',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/ant-design-vue',
    },
    {
      name: 'apexcharts',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/apexcharts',

    },
    {
      name: 'core-js',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/core-js',

    },
    {
      name: 'moment',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/moment',

    },{
      name: 'multi-range-slider-vue',
      license: 'ISC',
      link: 'https://www.npmjs.com/package/multi-range-slider-vue',
    },
    {
      name: 'stats-js',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/stats-js',
    },
    {
      name: 'three',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/three',
    },
    {
      name: 'three-obj-mtl-loader',
      license: 'MIT',
      license: '',
      link: 'https://www.npmjs.com/package/three-obj-mtl-loader',
    },
    {
      name: 'three-orbit-controls',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/three-orbit-controls',
    },
    {
      name: 'three-orbitcontrols',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/three-orbitcontrols',
    },
    {
      name: 'vue',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/vue',
    },
    {
      name: 'vue-generate-component',
      license: 'ISC',
      link: 'https://www.npmjs.com/package/vue-generate-component',
    },
    {
      name: 'vue-router',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/vue-router',
    },
    {
      name: 'vue-time-slider',
      license: 'ISC',
      link: 'https://www.npmjs.com/package/vue-time-slider',
    },
    {
      name: 'vue-timeline-component',
      license: 'MIT',
      link: 'https://www.npmjs.com/package/vue-timeline-component',
    },
    {
        name: 'vue3-apexcharts',
        license: 'MIT',
        link: 'https://www.npmjs.com/package/vue3-apexcharts',
    }]);


    return{
      datas,
      license,
    }
  }
}


