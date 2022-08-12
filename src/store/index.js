import Vue from "vue"
import Vuex from "vuex"
import home from "./Home"
import search from "./Search"
import detail from "./Detail"
import CartList from "./CartList"
import User from "./User"
import trade from "./trade"
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        CartList,
        User,
        trade
    }
})