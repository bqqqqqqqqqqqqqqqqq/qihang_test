import { httpRequest } from '../../utils/request'
const baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host



Page({
  data:{
    src:'../../static/images/default.jpg',
    uid:'uid',
    name:'Name'
  },
    ping(data:any) {
      console.log(baseUrl+'/ping')
      httpRequest.post<null>(
        baseUrl + '/ping',
        data
      )

    }


})
