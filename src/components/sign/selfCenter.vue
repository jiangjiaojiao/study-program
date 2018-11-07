<template>
<div class="selfCenter">
	<div class="self_info">
		<Card>
        <p slot="title">
        	<Icon type="happy-outline"></Icon>
            个人中心
        </p>
        <div>
        	<p>姓名：{{name}}</p>
			<p>邮箱：{{email}}</p>
			<p>积分：{{total_score || 0}}</p>
			<p><a href="/user/settings/networks">绑定第三方登录</a></p>
        </div>
    	</Card>
	</div>
</div>
</template>
<script>
	export default{
		name:'selfCenter',
		data(){
			return{
				name:'',
				email:'',
				total_score:''
			}
		},
		components:{

		},
		methods:{
			//获取用户信息
			getUserInfo(){
				let _this=this;
				let id = window.localStorage.getItem('id');
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/users/'+id+'?expand=profile',
                  success: function(response, textStatus, jqXHR){
                  		var items = response;
                    	_this.name=items.profile.name;
                    	_this.email=items.email;
                  },
                  error: function(jqXHR, textStatus, errorThrown){

                  }
                });
			},
			totalScore(){
				let _this = this;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/user/score?list=0',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  		_this.total_score = response.grade_total;
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			}
		},
		mounted:function (){			
			this.totalScore();
			/*从路由上获取uid*/
            let uid=this.$route.query.uid;
            if(uid){
                window.localStorage.setItem('id',uid);
                this.getUserInfo(uid);
            }else{
            	this.getUserInfo();
            }
		}
	}
</script>
<style scoped>
.self_info{
	color: #333;
	font-size: 0.15rem;
	padding: 0.15rem;
}

.self_info p{
	padding-bottom: 0.15rem;
}

</style>