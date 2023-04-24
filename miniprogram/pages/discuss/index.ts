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
    searchList: [
      {
        type: 'radio',
        screenKey: '订单状态',
        screenValue: ['新订单', '已受理', '已发货', '已过期'].map((m) => ({
          checked: false,
          value: m,
        })),
      },
      {
        type: 'radio',
        screenKey: '按时间',
        screenValue: ['5天内', '半个月', '一个月内', '一个月上'].map((m) => ({
          checked: false,
          value: m,
        })),
      },
      {
        type: 'checkbox',
        screenKey: '按门店',
        screenValue: [
          '配送总部',
          '信义店',
          '多又好汉王庙店',
          '多又好驷马店',
          '多又好森林公园店',
          '多又好镇龙店',
          '西门一店',
        ].map((m) => ({
          checked: false,
          value: m,
        })),
      },
    ],
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
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
});