import { reqBannerList, reqCategoryList ,reqFloorList} from "@/api/index"
const actions = {
    //拿到三级联动导航数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)

        }
    },
    // 拿到轮播图数据
    async bannerList({ commit }) {
        let result = await reqBannerList()
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },
    //获取floor数据
    async floorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    }
}
const mutations = {
    //导航栏标签数据
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList.slice(0, 15)
    },
    //轮播图片数据
    BANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    //楼层轮播数据
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const state = {
    categoryList: [],
    bannerList:[],
    floorList:[]
}
const getters = {}
export default {
    actions,
    mutations,
    state,
    getters
}
