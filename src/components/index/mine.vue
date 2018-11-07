<template>
<div class="mine">
	<div class="portrait">
		<div class="shadow"></div>
		<div class="head_photo">
		</div>
		<!-- <input id="fileImage" class="head_photo" type="file"  accept="image/*" size="30"> -->
		<p>{{userName}}</p>
		<div class="btn_content">
			<button class="sign" @click="signOut()">退出</button>
			<!-- <button v-show="isSign" class="sign" @click="signIn()">签到</button>
		<button v-show="!isSign" class="unsign">已签到</button> -->
		</div>
		<div class="get">
			<p><span>已得学分</span><span>{{total_score == null ? 0 : total_score}}</span></p>
			<p @click="toScore()"></p>
		</div>
	</div>
	<div class="menu_list">
		<div>
			<p>评分日志</p>
			<p  @click="toLog()"></p>
		</div>
		<!-- <div>
			<p>我的评价</p>
			<p  @click="toAppraise()"></p>
		</div> -->
		<div>
			<p>建议</p>
			<p @click="toSuggestion()"></p>
		</div>
		<div>
			<p>绑定第三方登录</p>
			<p @click="toBindChat()"></p>
		</div>
		
	</div>
</div>
</template>
<script>
	export default{
		name:'mine',
		data(){
			return{
				isSign:true,
				userName:'',
				total_score:''
			}
		},
		components:{

		},
		methods:{
			toLog(){
				this.$router.push({'path':'/log'});
			},
			toScore(){
				this.$router.push({'path':'/getScore'});
			},
			/*toAppraise(){
				this.$router.push({'path':'/appraise'});
			},*/
			toSuggestion(){
				this.$router.push({'path':'/suggestion'});
			},
			signIn(){
				this.isSign = !this.isSign;
			},
			signOut(){
				let _this =this;
				$.ajax({
                  type: 'POST',
                  dataType: 'json',
                  url:this.baseapath+'api/user/logout',
                  success: function(response, textStatus, jqXHR){
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  		_this.$router.push({'path':'/'});
                  }
                });
			},
			getUserInfo(){
				//获取用户信息
				let _this=this;
				let id = window.localStorage.getItem('id');
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/users/'+id+'?expand=profile',
                  success: function(response, textStatus, jqXHR){
                  		var items = response;
                    	_this.userName=items.profile.name;
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
			},
			toBindChat(){
				location.href = '/user/settings/networks';
			}
		},
		mounted:function () {
			this.getUserInfo();
			this.totalScore();
		}
	}
</script>
<style scoped>
.portrait{
	width: 100%;
	height: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center; 
	background-image: url('../.././images/bg.jpg');
	background-size:cover;
	background-repeat: no-repeat;
	background-position:center;
	position: relative;
}
.head_photo{
	width: 0.55rem;
	/* height: 0.55rem; */
	height: 0.8rem;
	background-image: url('../.././images/human.jpg');
	background-size:cover;
	background-position:center;
	background-repeat: no-repeat;
	border-radius: 0.275rem;
	margin-bottom: 0.12rem;
	margin-top: 0.35rem;
	z-index: 888;
}
.shadow{
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: rgba(255,255,255,0.6);
	z-index: 666;
	left: 0;
	top: 0;
}
.portrait p{
	width: 100%;
	text-align: center;
	color: #221e19;
	font-size: 15px;
	margin-bottom: 0.16rem;
}
.sign,.unsign{
	width: 0.6rem;
	height: 0.28rem;
	border-radius: 0.2rem;
	border:none;
	text-align: center;
	line-height: 0.28rem;
	font-size: 13px;
	outline: none;
}
.sign{
	background-color:#2aaafd;
	color: #fff;
}
.btn_content{
	position: relative;
	z-index: 888;
}
.unsign{
	color: #989898;
	border: 1px solid #989898;
	background-color: rgba(255,255,255,0);
}
.portrait p{
	z-index: 888;
}
.get{
	position: relative;
	width:95%;
	height: 0.54rem;
	background-color: #fff;
	bottom: -0.3rem;
	left: 0;
	z-index: 888;
	display: flex;
	box-shadow: 3px 3px 2px #f0f0f0;
}
.get p:nth-of-type(1){
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	background:url('../.././images/cup.png') no-repeat 10px center;
	background-size: 21px 22px;
	padding-left: 0.42rem;
	justify-content: space-between;
}
.get p:nth-of-type(1) span:nth-of-type(1){
	color:#2a2a2a;
	font-size: 13px;
}
.get p:nth-of-type(1) span:nth-of-type(2){
	color:#1d1d1d;
	font-size: 13px;
	padding-right: 0.2rem;
}
.get p:nth-of-type(2){
	width: 0.3rem;
	height: 100%;
	background:url('../.././images/right.png') no-repeat center;
	background-size: 9px 18px;
}
.menu_list{
	padding-top: 0.35rem;
	width: 100%;
	height: auto;
	padding-left: 0.1rem;
	padding-right: 0.1rem;
}
.menu_list>div{
	width: 100%;
	height: 0.45rem;
	border-bottom: 1px solid #d8d8d8;
	display: flex;
	align-items: center;
	font-size: 13px;
	color: #333;
}
.menu_list>div p:nth-of-type(1){
	flex: 1;
	padding-left: 0.42rem;
}
.menu_list>div p:nth-of-type(2){
	width: 40px;
	height: 100%;
	background: url('../.././images/right.png') no-repeat center;
	background-size: 9px 18px;
}
.menu_list>div:nth-of-type(1) p:nth-of-type(1){
	background: url('../.././images/log.png') no-repeat 10px center;
}
.menu_list>div:nth-of-type(2) p:nth-of-type(1){
	background: url('../.././images/apprise.png') no-repeat 10px center;
}
.menu_list>div:nth-of-type(3) p:nth-of-type(1){
	background: url('../.././images/suggestion.png') no-repeat 10px center;
}
</style>