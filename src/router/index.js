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
const adddata = () =>
    import ('@/pages/admin/main/rate/adddata/index')
const bloodsugar = () =>
    import ('@/pages/admin/main/rate/adddata2/bloodsugar/index')
const analysis = () =>
    import ('@/pages/admin/main/rate/adddata2/analysis/index')
const diet = () =>
    import ('@/pages/admin/main/rate/adddata2/diet/index')
const dietrecord = () =>
    import ('@/pages/admin/main/rate/adddata2/diet/record/index')
const dietrecorddetail = () =>
    import ('@/pages/admin/main/rate/adddata2/diet/recorddetail/index')
const motion = () =>
    import ('@/pages/admin/main/rate/adddata2/motion/index')
const motionrecord = () =>
    import ('@/pages/admin/main/rate/adddata2/motion/record/index')
const motionrecorddetail = () =>
    import ('@/pages/admin/main/rate/adddata2/motion/recorddetail/index')
const weight = () =>
    import ('@/pages/admin/main/rate/adddata2/weight/index')
const height = () =>
    import ('@/pages/admin/main/rate/adddata2/height/index')
const wheightrecord = () =>
    import ('@/pages/admin/main/rate/adddata2/height/record/index')
const wheightrecorddetail = () =>
    import ('@/pages/admin/main/rate/adddata2/height/recorddetail/index')
const bloodpressure = () =>
    import ('@/pages/admin/main/rate/adddata2/bloodpressure/index')
const bloodpressurerecorddetail = () =>
    import ('@/pages/admin/main/rate/adddata2/bloodpressure/recorddetail/index')
const pressurerecord = () =>
    import ('@/pages/admin/main/rate/adddata2/bloodpressure/record/index')
const medication = () =>
    import ('@/pages/admin/main/rate/adddata2/medication/index')
const medicationrecord = () =>
    import ('@/pages/admin/main/rate/adddata2/medication/record/index')
const medicationrecorddetail = () =>
    import ('@/pages/admin/main/rate/adddata2/medication/recorddetail/index')
const adddata2 = () =>
    import ('@/pages/admin/main/rate/adddata2/index')
const seedata = () =>
    import ('@/pages/admin/main/rate/seedata/index')
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
                                    children: [
                                        // {
                                        //     path: 'adddata',
                                        //     name: 'adddata',
                                        //     component: adddata,
                                        // },
                                        // {
                                        //     path: 'adddata2',
                                        //     name: 'adddata2',
                                        //     component: adddata2,
                                        // },
                                        // {
                                        //     path: 'seedata',
                                        //     name: 'seedata',
                                        //     component: seedata,
                                        // },
                                    ]
                                },
                                {
                                    path: 'adddata',
                                    name: 'adddata',
                                    component: adddata,
                                },
                                {
                                    path: 'adddata2',
                                    name: 'adddata2',
                                    component: adddata2,
                                    children:[
                                        {
                                            path: 'analysis',
                                            name: 'analysis',
                                            component: analysis,
                                        },
                                        {
                                            path: 'bloodsugar',
                                            name: 'bloodsugar',
                                            component: bloodsugar,
                                        },
                                        {
                                            path: 'diet',
                                            name: 'diet',
                                            component: diet,
                                        },
                                        {
                                            path: 'dietrecorddetail',
                                            name: 'dietrecorddetail',
                                            component: dietrecorddetail,
                                        },
                                        {
                                            path: 'dietrecord',
                                            name: 'dietrecord',
                                            component: dietrecord,
                                        },
                                        {
                                            path: 'motion',
                                            name: 'motion',
                                            component: motion,
                                        },
                                        {
                                            path: 'motionrecord',
                                            name: 'motionrecord',
                                            component: motionrecord,
                                        },
                                        {
                                            path: 'motionrecorddetail',
                                            name: 'motionrecorddetail',
                                            component: motionrecorddetail,
                                        },
                                        {
                                            path: 'weight',
                                            name: 'weight',
                                            component: weight,
                                        },
                                        {
                                            path: 'height',
                                            name: 'height',
                                            component: height,
                                        },
                                        {
                                            path: 'wheightrecord',
                                            name: 'wheightrecord',
                                            component: wheightrecord,
                                        },
                                        {
                                            path: 'wheightrecorddetail',
                                            name: 'wheightrecorddetail',
                                            component: wheightrecorddetail,
                                        },
                                        {
                                            path: 'bloodpressure',
                                            name: 'bloodpressure',
                                            component: bloodpressure,
                                        },
                                        {
                                            path: 'bloodpressurerecorddetail',
                                            name: 'bloodpressurerecorddetail',
                                            component: bloodpressurerecorddetail,
                                        },
                                        {
                                            path: 'pressurerecord',
                                            name: 'pressurerecord',
                                            component: pressurerecord,
                                        },
                                        {
                                            path: 'medication',
                                            name: 'medication',
                                            component: medication,
                                        },
                                        {
                                            path: 'medicationrecord',
                                            name: 'medicationrecord',
                                            component: medicationrecord,
                                        },
                                        {
                                            path: 'medicationrecorddetail',
                                            name: 'medicationrecorddetail',
                                            component: medicationrecorddetail,
                                        },
                                    ]
                                },
                                {
                                    path: 'seedata',
                                    name: 'seedata',
                                    component: seedata,
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