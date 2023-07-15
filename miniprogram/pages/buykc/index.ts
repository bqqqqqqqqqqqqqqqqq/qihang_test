// pages/buykc/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        kid: 1,
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/img1pa2o2w225fb.jpeg',
        t_name:'dj',
        type: '数学',
        price:'8'
      },
      {
        kid: 2,
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/img1pa2o2w225fb.jpeg',
        type: '数学',
        price:'8'
      },
      {
        kid: 3,
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/img1pa2o2w225fb.jpeg',
        price:'8'
      }
    ]
  },
    //跳转
    go(url:string,params?:string){
      let gourl = '';
      if (params) {
        gourl = '/pages/'+url+'/index?' + params;
      }else{
        gourl = '/pages/'+url+'/index';
      }
      wx.navigateTo({
        url:gourl
    });
  },
  gotobuy(e:any){
    let p = e.currentTarget.dataset.kid;
    this.go('order','kid='+p);
    
  },
 //下拉刷新
  onPullDownRefresh() {

  },
})