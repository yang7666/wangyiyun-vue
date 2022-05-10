import Vue from 'vue'
import App from './App.vue'
// 用绝对路径，vue-cli内置定义webpack定义路径变量
import "@/mobile/flexible"
import "@/styles/reset.css"

import router from "@/router"

// 全局注册 (自动按需引入)
import { NavBar,Tabbar, TabbarItem,Col, Row,Image as VanImage ,
   Cell, CellGroup,Icon,Search,Tag,PullRefresh,List  } from 'vant';
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Tag);
Vue.use(PullRefresh);
Vue.use(List);



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
