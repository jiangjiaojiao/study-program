<template>
  <div id="login">  
      <div class="logo_photo">
      </div>
      <h1 class="logo_title">享学会</h1>
      <div class="input_mess">
      	<div class="input_user">
      		<label>账号</label>
      		<input type="text" name="username" v-model='info.username'>
      	</div>
      	<div class="input_pass">
      		<label>密码</label>
      		<input type="password" name="password" v-model='info.password'>
      	</div>
      	<p class="logo_btn">
      		<button @click='loginIn'>登录</button>
      	</p>
        <p class="chat"><a :href="weichat">微信登录</a></p>
        <p class="chatQ"><a :href="qchat">qq登录</a></p>
        <!-- <p class="chat"><a href="/user/auth?authclient=wx&redirect=/vue/">微信登录</a></p>
        <p class="chatQ"><a href="/user/auth?authclient=qq&redirect=/vue/">qq登录</a></p> -->
      </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
  	return {
  		info:{
  			username:'',
  			password:''
  		},
      weichat:'/user/auth?authclient=wx&redirect=/vue/',
      qchat:'/user/auth?authclient=qq&redirect=/vue/'
  	}
  },
  components:{
	
  },
  methods:{
  	loginIn(){
      $('.ivu-message-notice').hide();
  		if(this.info.username == ''){
  			this.$Message.warning('请输入账号');
  			return;
  		}else if(this.info.password == ''){
  			this.$Message.warning('请输入密码');
  			return;
  		}else{
  			let _this=this;
  			$.ajax({
                  type: 'post',
                  dataType: 'json',
                  url:this.baseapath+'api/user/login',
                  data:{
                  	login:this.info.username,
                  	password:this.info.password
                  },
                  success: function(response, textStatus, jqXHR){
                    if(response.status==200){
                    	_this.$Message.success(response.message);
                      /*_this.$router.push({'path':'/'});*/
                      //跳转
                      if(!_this.$route.query.path && !_this.$route.query.class_id){
                        _this.$router.push({'path':'/'});
                      }else if(_this.$route.query.path && !_this.$route.query.class_id){
                        if(_this.$route.query.path && _this.$route.query.id && _this.$route.query.title){
                          _this.$router.push({path:_this.$route.query.path,query:{id:_this.$route.query.id,title:_this.$route.query.title,}});
                        }else{
                          _this.$router.push({path:_this.$route.query.path});   
                        }
                      }else if(_this.$route.query.path && _this.$route.query.class_id){
                        _this.$router.push({path:_this.$route.query.path,query:{class_id:_this.$route.query.class_id}});
                      }
                    	window.localStorage.setItem('id',response.data.id);
                    }
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	if(jqXHR.responseJSON.status == 401){
                  		if(jqXHR.responseJSON.code == 0){
                  			_this.$Message.error(jqXHR.responseJSON.message);
                  		}else if(jqXHR.responseJSON.code == 5){
                  			_this.$Message.error(jqXHR.responseJSON.message);
                  		}
                    }
                  }
                });
  		}
  	}
  },
  mounted:function () {
      if(this.$route.query.path && this.$route.query.class_id){
            this.weichat = '/user/auth?authclient=wx&redirect=/vue'+this.$route.query.path+'?class_id='+this.$route.query.class_id;
            this.qchat = '/user/auth?authclient=qq&redirect=/vue'+this.$route.query.path+'?class_id='+this.$route.query.class_id;
            console.log('link',this.weichat,this.qchat);
      }
  }
}
</script>
<style scoped>
.login{
	width:100%;
	height:100%;
}
.logo_photo{
	margin:0 auto;
	margin-top: 0.4rem;
	width:1.3rem;
	height:1.3rem;
	background-color:#d8edff;
	border-radius:0.1rem;
}
.logo_title{
	color: #1877e6;
	text-align: center;
	height: 1rem;
	width: 100%;
	line-height: 1rem;
}
.input_mess{
	color: #bebebe;
	width: 100%;
	height: auto;
	font-size: 0.18rem;
	margin-top: 0.3rem;
	display: flex;
	flex-direction: column;
}
.input_mess div{
	width: 75%;
	height: 0.43rem;
	line-height: 0.43rem;
	margin: 0 auto;
	border-bottom: 2px solid #d8d8d8;
}
.input_mess div:first-child{
	margin-bottom: 0.3rem;
}
.input_mess input{
	border: none;
	width: 70%;
	height: 0.3rem;
	color: #bebebe;
	padding-left: 0.1rem;
	outline:none;
}
.input_mess label{
	padding-left: 0.40rem;
} 
.logo_btn{
	width:100%;
	height: auto;
	margin-top: 0.5rem;
	margin-bottom: 0.1rem;
	display: flex;
	justify-content: center;
}
.logo_btn button{
	height: 0.66rem;
	/* background-color: #69beff; */
	background: linear-gradient(to right, rgba(60,162,255,1),rgba(60,162,255,0.8),rgb(102,206,255), rgb(114,218,255)); 
	width: 75%; 
	color: #fff;
	text-align: center;
	line-height: 0.66rem;
	border: none;
	border-radius: 0.25rem;
	outline:none;
}
.chat,.chatQ{
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  font-size: 14px;
}
</style>