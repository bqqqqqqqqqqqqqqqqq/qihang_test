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
  // develop: {
  //   host: 'https://deyiwxxiaochengxu.asia/deyiapi',
  //   imgHost: 'https://deyiwxxiaochengxu.asia/deyiapi'
  // },
  //   develop: {
  //   host: 'http://localhost:6785',
  //   imgHost: 'http://localhost:6785'
  // },
  develop: {
    host: 'https://deyiwxxiaochengxu.asia:6786',
    imgHost: 'https://deyiwxxiaochengxu.asia:6786',
  },
  trial: {
    host: 'https://deyiwxxiaochengxu.asia:6786',
    imgHost: 'https://deyiwxxiaochengxu.asia:6786',
  },
  release: {
    host: 'https://deyiwxxiaochengxu.asia:6786',
    imgHost: 'https://deyiwxxiaochengxu.asia:6786',
  },
}

export class allBaseUrl {
  /**
   * 国地服务器
  */
  static GDEnvs = (GDEnvs as any)[envVersion]
}