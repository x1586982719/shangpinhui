import request from "./ajax";
import mockRequst from "./mockAjax"

//提供API端口
export const reqCategoryList = () => {
    return request.get('/product/getBaseCategoryList')
}
export const reqBannerList = () => {
    return mockRequst.get('/banner')
}
export const reqFloorList = () => {
    return mockRequst.get('/floor')
}
export const reqSearchInfo = (data) => request({ method: 'post', url: '/list', data })
export const reqDetailInfo = (skuid) => request({ url: `/item/${skuid}`, method: 'get' });
export const reqAddCart = (skuid, skunum) => request({ url: `/cart/addToCart/${skuid}/${skunum}`, method: 'post' });
export const reqCartList = () => request({ url: '/cart/cartList', method: 'get' });
export const reqCartListCheckedUpdate = (skuid, isChecked) => request({ url: `cart/checkCart/${skuid}/${isChecked}`, method: 'get' });
export const reqCartListNumUpdate = (skuid, skunum) => request({ url: `/cart/addToCart/${skuid}/${skunum}`, method: 'post' });
export const reqCartListDelUpdate = (skuid) => request({ url: `/cart/deleteCart/${skuid}`, method: 'delete' });
export const reqCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
export const reqRegister = (data) => request({ url: '/user/passport/register', method: 'post', data });
export const reqLogin = (data) => request({ url: '/user/passport/login', method: 'post', data });
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' });//token检验API
export const reqLoginOut = () => request({ url: '/user/passport/logout', method: 'get' });
export const reqUserAdress = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });
export const reqTrade = () => request({ url: '/order/auth/trade', method: 'get' });
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
export const reqMyOrder = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' });
 