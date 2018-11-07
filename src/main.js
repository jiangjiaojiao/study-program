// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import '../static/font/iconfont.css';
import './style/base.css';
import Routers from './router/router'
import Util from './libs/util';
import VueRouter from 'vue-router';

Vue.use(iView)
Vue.use(VueRouter)

Vue.prototype.baseapath = '/';

Vue.prototype.format = function(fmt){
    var d = new Date();
    d.setTime(fmt * 1000);
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var data = d.getDate();
    return year+"-"+month+"-"+data;
};
//全局获取用户信息
Vue.prototype.getUserInfo= function(id){
    //获取用户信息
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url:'/api/users/'+id+'?expand=profile',
        success: function(response, textStatus, jqXHR){
            console.log('mainjs');
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });
};

//iview message配置
iView.Message.config({
  duration: 1
})
//所有ajax请求的error函数
$.ajaxSetup( {
    complete:function(jqXHR, textStatus, errorMsg){    
        if(jqXHR.status == 403 || jqXHR.status == 302) {
            var str=location.pathname;
            var query=location.search;
            var reg = /\/vue/;
            str=str.replace(reg,'');
            if(query){
                location.href = '/vue/login'+query+'&path='+str;
            }else{
                location.href = '/vue/login?path='+str;
            }            
            /*location.href = '/vue/login?path='+str;*/
        }
    },
    /*error: function(jqXHR, textStatus, errorMsg){ // 出错时默认的处理函数
        // jqXHR 是经过jQuery封装的XMLHttpRequest对象
        // textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
        // errorMsg 可能为： "Not Found"、"Internal Server Error"等
        // 提示形如：发送AJAX请求到"/index.html"时出错[404]：Not Found
        let _this = this;
        _this.$Message.error(jqXHR.responseJSON.message);
        _this.$router.push({'path':'/',query:{path:_this.$route.path,class_id:_this.$route.query.class_id}});
        console.log( '发送AJAX请求到'+jqXHR.status+textStatus+','+errorMsg);        
    }*/
} );

const RouterConfig = {
	base: '/vue/',
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

import $ from 'jquery'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,// 全局注入router，里面的所有的组件都能用到和路由相关的信息
  components: { App },
  template: '<App/>'
})
