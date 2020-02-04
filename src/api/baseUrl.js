/**
 * 所有api接口路径的集合
 */
const url = {
    test:'/query?type=快递公司代号&postid=快递单号',

    // 患者模块
    savePatient:'/onBoardWorkStation/savePatient',
    getAllProvince:'/province/getAll',
    getByProvinceId:'/city/getByProvinceId',
    saveCompanions:'/onBoardWorkStation/saveCompanions',
    bindWristband:'/onBoardWorkStation/bindWristband',
    getNations:'/nation/getAll',
    getPatientList:'/onBoardWorkStation/getPatientList',
    saveMysterious:'/onBoardWorkStation/saveMysterious',

    getAll:'/emergency/getAll',
    saveEmergency:'/onBoardWorkStation/saveEmergency',


    // 病历模块
    updateMedicalRecord:'/onBoardWorkStation/updateMedicalRecord',

    // 绿色通道模块
    getGreenChannelTypes:'/greenChannel/getAllGreenChannelType',
    // getGreenChannelResponseBranchList:'/onBoardWorkStation/getGreenChannelResponseBranchList',
    // greenChannelApply:'/onBoardWorkStation/greenChannelApply',
    greenChannelApply:'/greenChannel/saveGreenChannel',
    getGreenChannelResponseBranchList:'/greenChannelResponse/getGreenChannelResponseByGreenChannelId',

    // 体征监护模块
    saveVitalSign:'/onBoardWorkStation/saveVitalSigns',
    getVitalSign:'/onBoardWorkStation/getVitalSigns',

    // 评分模块
    saveTraumaScore:'/onBoardWorkStation/saveTraumaScore',
    getTraumaScore:'/onBoardWorkStation/getTraumaScore',
    getScoreItems:'/scoreItem/getScoreItems',

    // 治疗、护理模块
    saveTreatmentAndCare:'/onBoardWorkStation/saveTreatmentAndCare',
    getFirstAidMeasuresItems:'/onBoardWorkStation/getFirstAidMeasuresItems',
    getDrugTreatmentItems:'/onBoardWorkStation/getDrugTreatmentItems',
    getTreatmentAndCare:'/onBoardWorkStation/getTreatmentAndCare',
    getTreatmentAndCareItems:'/onBoardWorkStation/getTreatmentAndCareItems',
    getChildItems:'/onBoardWorkStation/getChildItems',
    saveChildItems:'/onBoardWorkStation/saveChildItems',

    // 出车模块
    saveVisitResults:'/onBoardWorkStation/saveVisitResults',
    getVisitResults:'/onBoardWorkStation/getVisitResults',

    // 初步诊断模块
    diagnosisInsert:'/preliminary/diagnosis/insert',
    getAllClassify:'disease/classify/getAllClassify',
    getDiagnosisInfo:'/preliminary/diagnosis/getDiagnosisInfo',

    
    // 检查模块
    savePhysicalCheck:'/onBoardWorkStation/savePhysicalCheck',
    getPhysicalCheck:'/onBoardWorkStation/getPhysicalCheck',
    getPhysicalCheckItems:'/onBoardWorkStation/getPhysicalCheckItems',
    

    // 时间轴模块
    setTimeAxis:'/outCarTimeRecord/add',
    getTimeAxis:'/onBoardWorkStation/getTimeAxis',

    // 首页接口
    getIndexData:'/onBoardWorkStation/getIndexData', 

}
export default url;