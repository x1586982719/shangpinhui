import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLoginOut,reqUserAdress } from "@/api/index"
import { setToken, getToken, clearToken } from '@/utils/token'
const actions = {
    async verCode({ commit }, phone) {
        let result = await reqCode(phone)
        if (result.code == 200) {
            commit('VERCODE', result.data)
        }
    },
    async submit({ commit }, data) {
        let result = await reqRegister(data)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(result.error)
        }
    },
    async login({ commit }, data) {
        let result = await reqLogin(data)
        if (result.code == 200) {
            commit('LOGIN',result.data)
        } else {
            return Promise.reject(result.error)
        }
    },
    //token检验API
    async getUser({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSER',result.data)
        } else {
            return Promise.reject(result.error)

        }
    },
    async loginOut({ commit }) {
        let result = await reqLoginOut()
        if (result.code == 200) {
            commit('LOGINOUT',result.data)
        }
    },
    async getAddress({commit}){
        let result = await reqUserAdress()
        if(result.code==200){
            commit('GETADRESS',result.data)
        }else{
            return Promise.reject(result.error)
        }
    }
}
const mutations = {
    VERCODE(state, code) {
        state.verCode = code
    },
    LOGINOUT(state) {
        clearToken()
        state.name = null
    },
    GETADRESS(state,address){
        state.address=address
    },
    LOGIN(state,data){
        setToken(data.token)
        state.name=data.name
    },
    GETUSER(state,data){
        state.name=data.name
    }
}
const state = {
    verCode: '',
    token: getToken(),
    name:null,
    address:[]
}
const getters = {}

export default {
    actions, mutations, state, getters
}