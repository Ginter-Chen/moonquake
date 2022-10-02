
import {reactive} from 'vue';
export default {
  name: 'page-about',
  components: {},
  props: [],
  setup(){
    let members = reactive([{
      memberName: 'Jun-Ting Chen',
      position: 'Frontend',
      link: 'https://www.facebook.com/peterhaps',
    },{
      memberName: 'Si-Yu Wei',
      position: 'Data Processing',
      link: 'https://www.linkedin.com/in/si-yu-wei-312206178/',
    },{
      memberName: 'Wei Hong',
      position: 'UX Designer',
      link: '#',
    },{
      memberName: 'Yi-Hsuan Tsai',
      position: 'Animator',
      link: 'https://www.behance.net/Jacqueline_Tsai',
    },{
      memberName: 'Jia-Fang Hsu',
      position: 'UI Designer',
      link: 'https://www.linkedin.com/in/jiafang-hsu/',
    },{
      memberName: 'Kuan-Ling Chen',
      position: 'Frontend',
      link: 'https://www.linkedin.com/in/lynn-chen-57039a122/',
    }]);

    let onClickCard = (link) => {
      window.open(link, '_blank')
    }

    return {
      members,
      onClickCard
    }
  }
}


