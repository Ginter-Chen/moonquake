import { createRouter, createWebHashHistory } from 'vue-router'
import  Ui  from '../components/ui/index.vue';
import pageMain  from '../components/page-main/index.vue';



const routes = [
    {
        path: '/ui',
        name: 'Ui',
        component: Ui,
    },
    {

        path: '/',
        redirect: '/main',
    },
    {
        path: '/main',
        name: 'Index',
        component: pageMain,
    },

]

export const router = createRouter({
    // mode: 'history',
    history: createWebHashHistory(),
    // base: ENV.production.base,
    // @ts-ignore 
    routes: routes,
    // @ts-ignore 
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition && to.meta.keepAlive) {
            return savedPosition;
        }
        if (to.hash) {
            return { el: to.hash, behavior: "smooth" };
        } else {
            // document.getElementById('main-layout-content').scrollTo(0, 0);
            // return { x: 0, y: 0 };
        }
    },

})

router.beforeEach(() => {
    window.scrollTo(0, 0)
    // ...
})

export default router;