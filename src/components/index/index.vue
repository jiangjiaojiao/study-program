<template>
<div class="index">
	<div class="content">
        <router-view></router-view> 
    </div>
    <div class="foot">
    	<Menu class="foot_tab" mode="horizontal" :theme="theme1" :active-name="activeName" @on-select="changeMenu">
        <MenuItem name="1">
        	<span class="iconfont icon-zaixianxuexi"></span>
            <p>学习</p>
        </MenuItem>
        <MenuItem name="2">
        	<span class="iconfont icon-weibiaoti9"></span>
            <p>知识库</p>
        </MenuItem>
        <MenuItem name="3">
        	<span class="iconfont icon-weibiaoti-_huabanfuben"></span>
            <p>我的</p>
        </MenuItem>
    </Menu>
    </div>
</div>
</template>
<script>
	export default{
		name:'index',
		data(){
			return{
				theme1:'light',
				activeName:'2'
			}
		},
		components:{

		},
		methods:{
			changeMenu(name){
				switch(name){
                    case '1':
                        this.$router.push({'path':'/study'});
                    break;
                    case '2':
                        this.$router.push({'path':'/'});
                    break;
                    case '3':
                        this.$router.push({'path':'/mine'});
                    break;
                }
			},
            getUserInfo(id){
                //获取用户信息
                let _this=this;
                $.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/users/'+id+'?expand=profile',
                  success: function(response, textStatus, jqXHR){
                        var items = response;
                        /*_this.userName=items.profile.name;*/
                  },
                  error: function(jqXHR, textStatus, errorThrown){

                  }
                });
            }
		},
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                let name = '';
                switch(to.path){
                    case '/study':
                    /*case '/finished':*/
                        name = '1';
                    break;
                    case '/':
                        name = '2';
                    break;
                    case '/mine':
                        name = '3';
                    break;
                }
                this.activeName = name;
                if(this.activeName == '1'){
                $('.foot_tab li').eq(0).children('span').addClass("font_active").parent('li').siblings().children('span').removeClass("font_active");
                }else if(this.activeName == '2'){
                    $('.foot_tab li').eq(1).children('span').addClass("font_active").parent('li').siblings().children('span').removeClass("font_active");
                }else if(this.activeName == '3'){
                    $('.foot_tab li').eq(2).children('span').addClass("font_active").parent('li').siblings().children('span').removeClass("font_active");
                }
            }
        },
		mounted:function () {
            let _this = this;
			let path = this.$route.path;
            switch(path){
                case '/study':
                    name = '1';
                break;
                case '/':
                    name = '2';
                break;
                case '/mine':
                    name = '3';
                break;
            }
            this.activeName = name;
            /*点击切换*/
            $('.foot_tab li').each(function(item){
                  $(this).click(function(){
                    $(this).children('span').addClass("font_active").parent('li').siblings().children('span').removeClass("font_active");
                   })
            });
            if(path == '/study'){
                $('.foot_tab li').eq(0).children('span').addClass("font_active").parent('li').siblings().children('span').removeClass("font_active");
            }else if(path == '/'){
                $('.foot_tab li').eq(1).children('span').addClass("font_active").parent('li').siblings().children('span').removeClass("font_active");
            }else if(path == '/mine'){
                $('.foot_tab li').eq(2).children('span').addClass("font_active").parent('li').siblings().children('span').removeClass("font_active");
            }
            /*从路由上获取uid*/
            let uid=this.$route.query.uid;
            if(uid){
                window.localStorage.setItem('id',uid);
                _this.getUserInfo(uid)
            }      
		}
	}
</script>
<style scoped>
.thank>div{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 0.5rem;
}

.thank img{
	width: 2rem;
	height: 2rem;
}
</style>