/**
 * 获取小程序版本信息
 * 值有：develop(开发版)、trial(体验版)、release(正式版)
*/
const accountInfo = wx.getAccountInfoSync()
const envVersion = accountInfo.miniProgram.envVersion || 'develop'

/**
   * 国地服务器
  */
const GDEnvs = {
  develop: {
    host: 'http://10.34.183.67:8888',
    imgHost: 'http://10.34.183.67:8888'
  },
  trial: {
    host: 'http://localhost:8888',
    imgHost: 'http://localhost:8888'
  },
  release: {
    host: 'http://localhost:8888',
    imgHost: 'http://localhost:8888'
  },
}

export class allBaseUrl {
  /**
   * 国地服务器
  */
  static GDEnvs = GDEnvs[envVersion]
}