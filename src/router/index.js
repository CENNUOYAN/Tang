import Vue from 'vue'
import Router from 'vue-router'

const base = () =>
    import ('@/pages/index')

const index = () =>
    import ('@/pages/admin/index')
const main = () =>
    import ('@/pages/admin/main/index')
const home = () =>
    import ('@/pages/admin/main/home/index')
const care = () =>
    import ('@/pages/admin/main/care/index')
const caserecord = () =>
    import ('@/pages/admin/main/caserecord/index')
const check = () =>
    import ('@/pages/admin/main/check/index')
const diagnosis = () =>
    import ('@/pages/admin/main/diagnosis/index')
const greenchannel = () =>
    import ('@/pages/admin/main/greenchannel/index')
const rate = () =>
    import ('@/pages/admin/main/rate/index')
const situation = () =>
    import ('@/pages/admin/main/situation/index')
const tutelage = () =>
    import ('@/pages/admin/main/tutelage/index')

const patientinfo = () =>
    import ('@/pages/admin/patientinfo/index')

const timeaxis = () =>
    import ('@/pages/timeaxis/index')

const minitimeaxis = () =>
    import ('@/pages/minitimeaxis/index')




Vue.use(Router)
const router = new Router({
    routes: [{
            path: '/',
            name: 'base',
            component: base,
            children: [{
                    path: '/',
                    name: 'baseindex',
                    component: index,
                    children: [{
                            path: '/',
                            name: 'main',
                            component: main,
                            redirect: '/',
                            children: [
                                {
                                    path: '/',
                                    name: 'home',
                                    component: home,
                                },
                                {
                                    path: '/care',
                                    name: 'care',
                                    component: care,
                                },
                                {
                                    path: '/caserecord',
                                    name: 'caserecord',
                                    component: caserecord,
                                },
                                {
                                    path: '/check',
                                    name: 'check',
                                    component: check,
                                },
                                {
                                    path: '/diagnosis',
                                    name: 'diagnosis',
                                    component: diagnosis,
                                },
                                {
                                    path: '/greenchannel',
                                    name: 'greenchannel',
                                    component: greenchannel,
                                },
                                {
                                    path: '/rate',
                                    name: 'rate',
                                    component: rate,
                                },
                                {
                                    path: '/situation',
                                    name: 'situation',
                                    component: situation,
                                },
                                {
                                    path: '/tutelage',
                                    name: 'tutelage',
                                    component: tutelage,
                                }
                            ]
                        },
                        {
                            path: '/patientinfo',
                            name: 'patientinfo',
                            component: patientinfo,
                        }
                    ]
                },
                {
                    path: '/timeaxis',
                    name: 'timeaxis',
                    component: timeaxis
                },
                {
                    path:'/minitimeaxis',
                    name:'minitimeaxis',
                    component:minitimeaxis
                }
            ]
        },

    ]
})
export default router;