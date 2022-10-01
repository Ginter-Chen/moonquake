
import {reactive} from 'vue';
export default {
  name: 'page-about',
  components: {},
  props: [],
  setup(){
    let members = reactive([{
      memberName: 'Jun-Ting Chen',
      position: 'Frontend'
    },{
      memberName: 'Si-Yu Wei',
      position: 'Data Processing'
    },{
      memberName: 'Wei Hong',
      position: 'UX Designer'
    },{
      memberName: 'Yi-Hsuan Tsai',
      position: 'Animator'
    },{
      memberName: 'Jia-Fang Hsu',
      position: 'UI Designer'
    },{
      memberName: 'Kuan-Ling Chen',
      position: 'Frontend'
    }]);
    return {
      members
    }
  }
}


