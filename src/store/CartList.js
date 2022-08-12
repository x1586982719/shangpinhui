import { reqCartList, reqCartListCheckedUpdate, reqCartListNumUpdate, reqCartListDelUpdate } from "@/api"
const actions = {
    async cartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('CARTLIST', result.data)
        }
    },
    async CheckedUpdate({ commit }, { skuid, isChecked }) {
        let result = await reqCartListCheckedUpdate(skuid, isChecked)
        if(result.code==200){
            return "ok"
        }else{
            return Promise(new Error('fail'))
        }
    },
    async NumUpdate({ commit }, { skuid, skunum }) {
        let result = await reqCartListNumUpdate(skuid, skunum)
    },
    async DelUpdate({ commit }, { skuid }) {
        let result = await reqCartListDelUpdate(skuid)
    },
    AllChecked({state,dispatch }, isChecked) {
        console.log(state.cartList.cartInfoList);
        let arr = []
        state.cartList.cartInfoList.forEach(item => {
            let promise = dispatch('CheckedUpdate',{ skuid: item.skuId, isChecked })
            arr.push(promise)
        });
        return Promise.all(arr)
    }
}
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList[0] || {}
    }
}
const state = {
    cartList: []
}
const getters = {
}
export default {
    actions,
    mutations,
    state,
    getters
}