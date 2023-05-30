Page({
  data: {
    show: false,
    list:[
      {
        pid: 1,
        cover_img:'../../static/images/a1.jpg',
        tag:['11','22']
      },
      {
        pid: 2,
        cover_img:'../../static/images/a1.jpg',
        tag:['11','22','33','44','55']
      }
    ],

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  
},
gotoUplode(){
  console.log("tt")
  wx.navigateTo({
    url:'/pages/uplode/index'
  })
}
});