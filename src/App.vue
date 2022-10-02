<template>

  <router-view ></router-view>


</template>

<script>

export default {
  name: 'App',
  components: {
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  font-family: '微軟正黑體', Arial;
}

 /**
 tooltip menu **/

.ant-tooltip.ant-menu-inline-collapsed-tooltip.ant-tooltip-placement-right .ant-tooltip-inner{
  display: flex;
    align-items: center;
    flex-wrap: wrap;

}
 .ant-tooltip.ant-menu-inline-collapsed-tooltip.ant-tooltip-placement-right .style--active{
    display: none;
 }
  .ant-tooltip.ant-menu-inline-collapsed-tooltip.ant-tooltip-placement-right .style--normal{
    width: 20px;
    display:inline-block;
    margin: 0 auto;
 }
 .ant-tooltip.ant-menu-inline-collapsed-tooltip.ant-tooltip-placement-right .icon-block{
  display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
 }

 .ant-tooltip.ant-menu-inline-collapsed-tooltip.ant-tooltip-placement-right .menu-txt{
   font-size: 12px;
    display: block;
    width: 100%;
    justify-content: center;
    padding: 0;
    margin: 0;
    text-align: center;
    margin-top: 4px;
}

/*slider*/
:root {
  --slider-connect-bg: #0060FF;
  --slider-bg: #2F2F2F;
} 

/*animation*/
.slide-fade{
 position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
 transition: all 1.2s ease;
}
.slide-fade-leave-active {

 transition: all .3s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
 left:0;right: 0;
 transform: translateX(50px);
 opacity: 0;
}

</style>
