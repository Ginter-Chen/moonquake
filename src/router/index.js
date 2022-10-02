import { createRouter, createWebHashHistory } from 'vue-router'
import  Ui  from '../components/ui/index.vue';
import pageMain  from '../components/page-main/index.vue';
import pageLayout  from '../components/page-layout/index.vue';
import pageAbout  from '../components/page-about/index.vue';
import pageRef  from '../components/page-ref/index.vue';
import pageLanding from '../components/page-landing/index.vue';



const routes = [
    {
        path: '/landing',
        name: 'landing',
        component: pageLanding,
    },
    {
        path: '/ui',
        name: 'Ui',
        component: Ui,
    },
    {
        path: '/moonView',
        name: 'moonView',
        component: pageMain,
    },
    {
        path: '/',
        redirect: '/main/work',
    },
    {
        path: '/main',
        name: 'Index',
        component: pageLayout,
        children: [{
            path: 'work',
            name: 'work',
            component: pageMain,
        },{
            path: 'ref',
            name: 'ref',
            component: pageRef,
        },{
            path: 'about',
            name: 'about',
            component: pageAbout,
        }]
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