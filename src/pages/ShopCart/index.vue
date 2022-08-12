<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="cart in cartInfo" :key="cart.id">
        <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" v-model="cart.isChecked" @change="checkUpdate($event, cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="numUpdate(cart, -1, 'mins')">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
              @change="numUpdate(cart, $event.target.value * 1, 'input')">
            <a class="plus" @click="numUpdate(cart, 1, 'plus')">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="delUpdate(cart)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" @change="allChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ checkedNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ amount }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">
            <a class="sum-btn">结算</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle' //引入节流函数
import { mapState } from 'vuex'
export default {
  name: 'ShopCart',
  mounted() {
    this.goCartListInfo()
  },
  methods: {
    goCartListInfo() {
      this.$store.dispatch('cartList')
    },
    async checkUpdate(event, cart) {
      let checked = event.target.checked ? "1" : "0"
      try {
        await this.$store.dispatch('CheckedUpdate', { skuid: cart.skuId, isChecked: checked })
        this.goCartListInfo()

      }
      catch (error) {
        alert('失败')
      }
    },
    numUpdate: throttle(async function (cart, disNum, flag) {
      switch (flag) {
        case "plus": disNum = 1; break;
        case "input":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cart.skuNum
          } break;
        case "mins":
          if (cart.skuNum > 1) { disNum = -1 }
          else { disNum = 0; }
          break;
      }
      try {
        await this.$store.dispatch('NumUpdate', { skuid: cart.skuId, skunum: disNum })
        this.goCartListInfo()
      }
      catch (error) {
        alert("修改失败！")
      }
    }, 600),
    async delUpdate(cart) {
      try {
        await this.$store.dispatch('DelUpdate', { skuid: cart.skuId })
        this.goCartListInfo()
      }
      catch (error) {
        alert("失败！")
      }
    },
    delChecked() {
      this.cartInfo.forEach(item => {
        if (item.isChecked == '1') {
          this.delUpdate(item)
        }
      });
      this.goCartListInfo()
    },
    async allChecked(event) {
      let checked = event.target.checked ? "1" : "0"
      console.log(checked);
      try {
        await this.$store.dispatch('AllChecked', checked)
        this.goCartListInfo()
      }
      catch (error) {
      }

    }

  },
  computed: {
    ...mapState({
      cartList: (state) => state.CartList.cartList
    }),
    cartInfo() {
      return this.cartList.cartInfoList || []
    },
    isAllChecked: {
      get() {
        return this.cartInfo.every(item => item.isChecked == true) && this.cartInfo.length > 0
      },
      set() {

      }
    },
    amount() {
      var sum = 0
      this.cartInfo.forEach(item => {
        if (item.isChecked == "1") {
          sum = sum + item.cartPrice * item.skuNum
        }
      });
      return sum
    },
    checkedNum() {
      var count = 0
      this.cartInfo.forEach(item => {
        if (item.isChecked == '1') {
          count++
        }
      });
      return count
    }
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;

        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>