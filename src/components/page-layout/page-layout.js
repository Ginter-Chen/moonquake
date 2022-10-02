
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { useRouter,useRoute } from 'vue-router';
import {ref, watch} from 'vue';

export default {
  name: 'page-layout',
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },
  setup(){
    let isShowFooter = ref(false);
    const router = useRouter();
    const route = useRoute();
    let collapsed = ref(false);
    let selectedKeys =  ref(['1']);

    let onClickMenu = (itm) => {
      console.log('onClickMenu', itm)
      
      router.push({ name: itm });
      
    }
    console.log('route.name',route.name);
    isShowFooter.value = route.name === 'work' || route.name === 'landing' ? false : true;



      watch(
      () => (route.name),
      (val) => {
        console.log('route name', val);
        isShowFooter.value = val === 'work' || val === 'landing' ? false : true;
      },
      { deep: true },
    ) //end: watch

    return{
      collapsed,
      selectedKeys,
      onClickMenu,
      isShowFooter,
      
    }// end: return
  }
}


