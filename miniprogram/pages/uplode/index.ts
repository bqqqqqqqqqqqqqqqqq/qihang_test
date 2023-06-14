// pages/uplode/index.ts
interface SearchItem {
  type: string;
  screenKey: string;
  screenValue: ScreenValue[];
}

interface ScreenValue {
  checked: boolean;
  value: string;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true,
        deletable: true,
      },
      
    ],
    searchList: [
      {
        type: 'radio',
        screenKey: '请选择科目',
        screenValue: ['化学', '数学', '语文', '英语'].map((m) => ({
          checked: false,
          value: m,
        })),
      },
      {
        type: 'radio',
        screenKey: '请选择年级',
        screenValue: ['高一', '高二', '高三','dd','shfiksjlf' ].map((m) => ({
          checked: false,
          value: m,
        })),
      },
      {
        type: 'radio',
        screenKey: '请选择教师',
        screenValue: [
          '高启强',
          '封炉子',
         
        ].map((m) => ({
          checked: false,
          value: m,
        })),
      },
    ],
  },
  afterRead(event:any) {
    let that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: res.data });
        that.setData({ fileList });
      },
    });
  },
  deleteImg(event:any){
    let index= event.detail.index
    // console.log(index)//输出的就是图片所在fileList的下标
    var dataArray = this.data.fileList; // 获取数组数据
    dataArray.splice(index, 1); // 删除指定索引位置的元素
    this.setData({fileList: dataArray}); // 更新页面数据
  },
  onLoad(options) {
    this.query = wx.getStorageSync('query') || [];
    this.getSearchItems();
  },

  getSearchItems() {
    const _this = this;
    const searchItems = this.data.searchList.map((n) =>
      Object.assign({}, n, {
        screenValue: n.screenValue.map((m) =>
          Object.assign({}, { checked: _this.query.includes(m.value), value: m.value })
        ),
      })
    );
    this.setData({ searchList: searchItems });
  },

  onChange(e) {
    const { parentIndex, item, index } = e.detail;

    if (item.screenValue[index].checked) {
      item.screenValue[index].checked = false;
    } else {
      if (item.type != 'checkbox') {
        item.screenValue.map((n) => (n.checked = false));
      }
      item.screenValue[index].checked = true;
    }

    this.setData({ [`searchList[${parentIndex}]`]: item }, () => {
      let selected = [];
      this.data.searchList.map((n) => {
        n.screenValue.map((m) => {
          if (m.checked == true) {
            selected.push(m.value);
          }
        });
      });
      wx.setStorageSync('query', selected);
    });
  },

  doCancel() {
    wx.setStorageSync('query', []);
    //关闭弹出层
    wx.navigateBack();
  },
  doSubmit() {
    let selected:any = []
    // 获取所有选中
    this.data.searchList.map(n => {
      n.screenValue.map(m => {
        if (m.checked == true) {
          selected.push(m.value)
        }
      })
    })
    console.log(selected)
    // var pages = getCurrentPages() // 获取页面栈
    // var prevPage = pages[pages.length - 2] // 前一个页面
    // // 携带数据，返回登录之前的页面
    // prevPage.setData({
    //   query: selected,
    //   isBack: true
    // })
    // wx.navigateBack({
    //   delta: 1
    // })
  },

  reset(){
    const searchItem = this.data.searchList
    for (var i = 0; i < searchItem.length; i++) {
      for (var j = 0; j < searchItem[i].screenValue.length; j++){
        searchItem[i].screenValue[j].checked=false
        }
    }
    wx.setStorageSync('query', []) 
    this.setData({
      searchList: searchItem
    })
  },

})