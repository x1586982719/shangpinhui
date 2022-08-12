import { reqDetailInfo, reqAddCart } from "@/api/index"
import {getuuid} from '@/utils/uuid_token'

const actions = {
    //拿到detail数据
    async detailInfo({ commit }, skuid) {
        let result = await reqDetailInfo(skuid)
        if (result.code == 200) {
            commit('DETAILINFO', result.data)
        }
    },
    async addCart({ commit }, { skuid, skunum }) {
        let result = await reqAddCart(skuid,skunum)
        if(result.code==200){
            //代表当前函数addShopCart返回的promise状态是成功
            return 'ok'
        }else{
            //返回带有错误信息的promise函数
            return Promise.reject=new Error('faile')
        }
    }
}
const mutations = {
    //导航栏标签数据
    DETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo
    },
}
const state = {
    detailInfo: {},
    uuid_token: getuuid()
}
const getters = {
    categoryView(state) {
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detailInfo.spuSaleAttrList || []
    },
}
export default {
    actions,
    mutations,
    state,
    getters
}
