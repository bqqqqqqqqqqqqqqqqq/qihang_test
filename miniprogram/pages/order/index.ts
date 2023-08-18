// pages/order/index.ts
const stuList = [];

Page({
  data: {
    goodTitle:"",
    goodDesc:"",
    price:20,
    total:0,
    value:'',
    fieldValue: '',
    stuList:[],
    show0:false,
    show2:false,
    count:1,
  },
  //输入框
  onChange(e:any){
    let v = e.detail
    this.setData({
      value: v,
    });
  },
  getCount(event:any) {
    this.setData({
      count: event.detail
    })
  },
  onClose0() {
    this.setData({
      show0: false,
    });
  },
  onClick0() {
    this.setData({
      show0: true,
    });
  },
  chose(e:any){
    console.log(e.currentTarget.dataset.name);
    this.setData({
      value: e.currentTarget.dataset.name,
      show0: false
    })
    
  },
 
  onClick() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onFinish(e:any) {
    const { selectedOptions, value } = e.detail;
    const fieldValue = selectedOptions
        .map((option:any) => option.text || option.name)
        .join('/');
    this.setData({
      fieldValue,
      cascaderValue: value,
    })
  },
  onClose2() {
    this.setData({
      show2: false,
    });
  },
  onSubmit(){
    this.setData({
      show2: true,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const problemID = (this.options.id) as string
   
    this.setData({
      total:this.data.count*this.data.price
    })
  },

//----------------------------------------
// 微信支付





})