// import { textareaProps } from "../../miniprogram_npm/@vant/weapp/field/props";

Page({
  data: {
    show: false,
    list:[
      {
        pid: 1,
        cover_img:'../../static/images/a1.jpg',
        tag:'NO1'
      },
      {
        pid: 2,
        cover_img:'../../static/images/a1.jpg',
        tag:'NO1'
      }
    ],

    searchList: [{
      type: 'radio',
      screenKey: '订单状态',
      screenValue: ['新订单', '已受理', '已发货','已过期']
    },
    {
      type: 'radio',
      screenKey: '按时间',
      screenValue: ['5天内', '半个月', '一个月内','一个月上']
    },
    {
      type: 'checkbox',
      screenKey: '按门店',
      screenValue: ['配送总部', '信义店', '多又好汉王庙店', '多又好驷马店', '多又好森林公园店', '多又好镇龙店', '西门一店']
    }
    ] 
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
});
