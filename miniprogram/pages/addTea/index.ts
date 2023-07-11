import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

interface user{
  id: string,
  name: string
}
var userList: user[] = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    userList
  },
  click(e:any){
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    Dialog.confirm({
      message: '是否添加'+name+'为老师？',
    })
      .then(() => {
        // on confirm
        let oldList = this.data.userList;
        let newList = oldList.filter(item => item.id !== id);
        this.setData({
          userList:newList
        })
        
      })
      .catch(() => {
        // on cancel
      });
  },
  onLoad(options) {
    let t = options.type;
    console.log(t);
    
    this.setData({
      type: t
    })
  },
})