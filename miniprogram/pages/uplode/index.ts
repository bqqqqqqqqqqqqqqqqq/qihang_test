
import publicAPI from "../../api/system/publicAPI";

// pages/uplode/index.ts
let baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host

interface SearchItem {
  type: string;
  screenKey: string;
  screenValue: ScreenValue[];
}

interface ScreenValue {
  checked: boolean;
  value: string;
  need:boolean;
  remake:string;
}
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList:<any> [],
    searchList:<SearchItem[]>[
      {
        type: 'radio',
        screenKey: '请选择科目',
        screenValue: ['化学', '数学', '语文', '英语'].map((m) => ({
          checked: false,
          value: m,
          need:true
        })),
      },
      {
        type: 'radio',
        screenKey: '请选择年级',
        screenValue: ['初一','初二','初三','高一', '高二', '高三'].map((m) => ({
          checked: false,
          value: m,
          need:true
        })),
      },
      {
        type: 'radio',
        screenKey: '请选择教师',
        screenValue: [].map((m) => ({
          checked: false,
          value: m,
          need:true
        })),
      },
    ],
  },
  // 上传图片、上传文件校验格式-----好像这个不用写
  beforeRead(event:any){
    //before-read 事件可以在上传前进行校验，调用 callback 方法传入 true 表示校验通过，传入 false 表示校验失败。
    const { file, callback } = event.detail;
    callback(file.type === 'image');
  },
  afterRead(event:any) {
    let that = this;
    const { file } = event.detail;

    const { fileList = [] } = that.data;
    fileList.push({ ...file });
    that.setData({ fileList });
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
   
  },

  deleteImg(event:any){
    let index= event.detail.index
    var dataArray = this.data.fileList; // 获取数组数据
    dataArray.splice(index, 1); // 删除指定索引位置的元素
    this.setData({fileList: dataArray}); // 更新页面数据
  },

  onLoad(_options) {
    publicAPI.getTeacher().then((res:any)=>{
      if (res.code==200){
         var tea:any = []
         res.data.forEach((ele:any) => {
           tea.push(ele)
         });
        if (res.data!=null){
          const searchItem = this.data.searchList;
          searchItem[2].screenValue=tea.map((m: { name: string;id:string }) => ({
            checked: false,
            value: m.name,
            teacherID:m.id,
            need:true,
            remark:"teacher"
          }))
          this.setData({
            searchList: searchItem
          })
        }
      }
    })
  
  },
    

  
  // getSearchItems() {
  //   const _this = this;
  //   const searchItems = this.data.searchList.map((n) =>
  //     Object.assign({}, n, {
  //       screenValue: n.screenValue.map((m) =>
  //         Object.assign({}, { checked: this.query.includes(m.value), value: m.value })
  //       ),
  //     })
  //   );
  //   this.setData({ searchList: searchItems });
  // },

  onChange(e: { detail: { parentIndex: any; item: any; index: any; }; }) {
    const { parentIndex, item, index } = e.detail;
    if (item.screenValue[index].checked) {
      item.screenValue[index].checked = true;
    } else {
      if (item.type != 'checkbox') {
        item.screenValue.map((n: { checked: boolean; }) => (n.checked = false));
      }
      item.screenValue[index].checked = true;
    }
    this.setData({ [`searchList[${parentIndex}]`]: item }, () => {
      let selected: any[] = [];
      this.data.searchList.map((n) => {
        n.screenValue.map((m) => {
          if (m.checked == true) {
            selected.push(m.value);
          }
        });
      });
      // wx.setStorageSync('query', selected);
    });
  },

  doCancel() {
    // wx.setStorageSync('query', []);
    //关闭弹出层
    wx.navigateBack();
  },
  doSubmit(e:any) {
      let selected:any = []
      // 获取所有选中
      this.data.searchList.map(n => {
        n.screenValue.map((m:any) => {
          if (m.checked == true&&m.remark!="teacher") {
            selected.push(m.value)
          }
          if(m.remark=="teacher"&&m.checked==true){
            selected.push(m.teacherID)
          }
        })
      })
      if (this.data.fileList.length===0){
        wx.showToast({
          title:"请上传题目",
          icon:"error"
        })
        return
      }
      // 判断是否全选
     let checkedexit = false
     let searchList = this.data.searchList
     console.log(searchList)
     console.log(searchList[0].screenValue)
     console.log(searchList[0].screenValue.length)
      for (let i = 0;i<searchList.length;i++){
  
        checkedexit = false
        for (let j = 0;j<searchList[i].screenValue.length;j++){
          if (searchList[i].screenValue[j].checked==true){
            checkedexit = true
            break
          }
        }
      }
      if (checkedexit == false){
        wx.showToast({
          title:'请上传选项',
          icon:'error'
        })
        return
      }
  
      // 提交表单token上传图片
    for (let i = 0;i<this.data.fileList.length;i++){
        wx.uploadFile({
          url: baseUrl+"/user/UpPicture", //baseUrl+'', 仅为示例，非真实的接口地址
          filePath: this.data.fileList[i].url,
          method:'post',
          name: 'file',
          formData: {
            // token:app.globalData.token
            subjects:selected[0],
            grade:selected[1],
            teacherID:selected[2]
          },
          header: {
            Authorization: app.globalData.token
          },
          //待测试
          success(res: any){
              wx.showLoading({
                  title:"上传中",
                  mask:"true"
              })
            if (res.statusCode===200){
            wx.showToast({
              title:"已成功上传问题",
              icon:"none"
            })
            wx.hideLoading()
            setTimeout(()=>{
              wx.redirectTo({
                url: '../index/index'
             })
            },1000)
          }else {
            wx.showToast({
              title:"网络异常，请稍后重试试",
              icon:"none"
            })
          }
          },
        })
    }
  },
  
  reset(){
    const searchItem = this.data.searchList
    for (var i = 0; i < searchItem.length; i++) {
      for (var j = 0; j < searchItem[i].screenValue.length; j++){
        searchItem[i].screenValue[j].checked=false
        }
    }

    // wx.setStorageSync('query', []) 
    this.setData({
      searchList: searchItem
    })
  },
oversize(){
  wx.showToast({
    title:"超过大小，请压缩后上传",
    icon:"none"
  })
}, 
  async APITime() {
    return new Promise(resolve =>setTimeout(() =>resolve, 1000))
  }
})