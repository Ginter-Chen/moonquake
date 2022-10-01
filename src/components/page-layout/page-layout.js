
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import {ref} from 'vue';

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
    const router = useRouter();
    let collapsed = ref(false);
    let selectedKeys =  ref(['1']);

    let onClickMenu = (itm) => {
      console.log('onClickMenu', itm)
      router.push({ name: itm });
    }
    return{
      collapsed,
      selectedKeys,
      onClickMenu,
      
    }// end: return
  }
}


