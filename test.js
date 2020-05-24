const assert = require('assert')
const API = require('./api')

const productionId = process.env.PROD_ID

async function test () {
  // 設定 cookie
  const api = new API({
    ECC: process.env.COOKIE_ECC,
    COOKIE_ECWEBSESS: process.env.COOKIE_COOKIE_ECWEBSESS
  })

  // 在加入購物車前，必須先呼叫這支 API，來取得產品狀況
  const snapupResult = await api.snapup(productionId)

  // 加入購物車
  const add2CartResult = await api.add2Cart(productionId, snapupResult, 1)
  assert(add2CartResult.PRODCOUNT > 0)

  // 非必要流程，可以用來確認目前購物車的狀況、運費、支援的配送方式等...
  // const res = await api.getCartInfo()
  // console.log((res.shoppingFee) ? '要運費' : '免運費')
  // console.log((res.payment.COD.status === 'Y') ? '可貨到付款' : '不可貨到付款')
  // if (res.shoppingFee /* 需要運費 */ || res.payment.COD.status === 'N' /* 無法貨到付款 */) {
  //   return console.log('取消流程')
  // }

  // 送出訂單
  // const result = await api.order({
  //   cusName: 'ALiangLiang',
  //   cusMobile: '0987654321',
  //   cusZip: '30010',
  //   cusAddress: '新竹市東區大學路1001號',
  //   recName: 'ALiangLiang',
  //   recMobile: '0987654321',
  //   recZip: '30010',
  //   recAddress: '新竹市東區大學路1001號'
  // })

  // if (result.status === 'ERR') {
  //   throw new Error(result.msg)
  // }
  // console.log(result)
}

test().catch(console.error)