import { reqSearchInfo } from "@/api/index"
const actions = {
    async searchInfo({ commit }, data) {
        let result = await reqSearchInfo(data)
        if (result.code == 200) {
            commit('SEARCHINFO', result.data)
        }
    },
}
const mutations = {
    SEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo
    }
}
const state = {
    searchInfo: {}
}
const getters = {
    goodsList(state) {
        return state.searchInfo.goodsList || []
    },
    attrsList(state) {
        return state.searchInfo.attrsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    }

}
export default {
    actions,
    mutations,
    state,
    getters
}
