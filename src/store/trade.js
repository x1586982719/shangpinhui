import { reqTrade } from "@/api"
const actions = {
    async getTrade({ commit }) {
        let result = await reqTrade()
        if (result.code == 200) {
            commit('GETTRADE', result.data)
        } else {
            return Promise.reject(result.error)
        }
    },
}
const mutations = {
    GETTRADE(state, data) {
        state.tradeInfo = data
    },
}
const state = {
    tradeInfo: {},
}
const getters = {
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList || []
    }
}
export default { actions, mutations, state, getters }