Page({
  data: {
    active: 0,
    list: [
      {
        url: "/pages/index/index",
        iconPath: "wap-home-o",
        selectedIconPath: "wap-home-o",
        text: "主页"
      },
      {
        url: "/pages/discuss/index",
        iconPath: "comment-o",
        selectedIconPath: "comment-o",
        text: "论坛"
      },
      {
        url: "/pages/user/index",
        iconPath: "contact",
        selectedIconPath: "contact",
        text: "我的"
      }
    ]
  },
  onChange(e: any) {

    wx.switchTab({
      url: this.data.list[e.detail].url
    });
    this.setData({ active: e.detail });
  },
  init() {
    const page :any = getCurrentPages().pop();
    this.setData({
   　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
    });
   } 
});
