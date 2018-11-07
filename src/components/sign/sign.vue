<template>
<div class="sign">
	<div class="sign_info">
		<Card>
        <p slot="title">
        	<Icon type="happy-outline"></Icon>
            课程信息
        </p>
        <div>
        	<div>
        	<label>课程名称:</label>
			    <i-select v-model="model2" @on-change="getClassInfo(model2)" placeholder="请选择课程" :style="{width: '200px'}">
			    <i-option v-for="(item, index) in cityList" :value="item.id" :key="index">{{item.name}}</i-option>
			  </i-select>
		    </div>
			<p>讲师：{{teacher}}</p>
			<p>时间：{{time}}</p>
			<p>课程简介：{{abstract}}</p>
        </div>
    	</Card>
	</div>
	<div class="sign_btn">
		<button @click="signIn(classId)">课程签到</button>
	</div>
</div>
</template>
<script>
	export default{
		name:'sign',
		data () {
            return {
                cityList: [],//课程下拉列表
                model2: 1,
                classId:'',//课程id
                teacher:'',//讲师
                time:'',//时间
                abstract:'',//描述
                isSign:false,//是否签到
                hint:''//提示
            }
        },
		components:{

		},
		methods:{
			getClassList(){
				let _this=this;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/classes',
                  success: function(response, textStatus, jqXHR){
                  			_this.cityList = [];
                    		for(var i=0;i<response.length;i++){
                    			//如果url含有class_id
                    			if(_this.$route.query.class_id){
                    				if(response[i].id == _this.$route.query.class_id){
                    					_this.cityList.push({
		                    			id:response[i].id,
		                    			name:response[i].title
		                    			})
		                    			_this.getClassInfo(_this.$route.query.class_id);
                    				}
                    			}else{
                    				_this.cityList.push({
	                    			id:response[i].id,
	                    			name:response[i].title
	                    			})
	                    			_this.getClassInfo(1);
                    			}
                    		} 
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	_this.$Message.error(jqXHR.responseJSON.message);
                  	/*_this.$router.push({'path':'/login',query:{path:_this.$route.path,class_id:_this.$route.query.class_id}});*/
                  }
                });
			},
			getClassInfo(id){
				let _this=this;
				if(this.$route.query.class_id){
					this.model2 = Number(this.$route.query.class_id);
				}
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/classes/'+id+'?expand=category,teacher,teacherProfile',
                  success: function(response, textStatus, jqXHR){
                    	var items = response;
                    	_this.teacher=items.teacherProfile.name;
                    	_this.time=_this.format(items.created_at);
                    	_this.abstract=items.desc;
                  },
                  error: function(jqXHR, textStatus, errorThrown){

                  }
                });
			},
			signIn(){
				let _this = this;
				$('.ivu-message-notice').hide();
				if(this.model2 == ''){
					this.$Message.warning('请选择课程！');
					return;
				}
				$.ajax({
                  type: 'POST',
                  dataType: 'json',
                  url:this.baseapath+"api/signing/log?class_id="+this.model2,
                  success: function(response, textStatus, jqXHR){
                    _this.$Message.success('签到成功！');
                    _this.isSign=true;
                    if(_this.isSign){
                    	$('.sign_btn button').html('已签到');
						$(".sign_btn button").attr("disabled","disabled");
						return;
					}
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	if(jqXHR.status == 403){
                  		_this.$Message.error(jqXHR.responseJSON.message);
                  		_this.$router.push({'path':'/login',query:{path:_this.$route.path,class_id:_this.model2}});
                  		return;
                  	}else if(jqXHR.status == 422){
                  		_this.$Message.config({
						    duration: 1
						});
		                _this.$Message.error(jqXHR.responseJSON[0].message);
                  		return;
                  	} 	
                  }
                });
			}
		},
		created(){
			this.getClassList();
		},
		mounted:function () {
			/*从路由上获取uid*/
            let uid=this.$route.query.uid;
            if(uid){
                window.localStorage.setItem('id',uid);
                this.getUserInfo(uid);
            }
		}
	}
</script>
<style scoped>
.sign_btn{
	width: 100%;
	height: 0.45rem;
	text-align: center;
	margin-top: 0.4rem;
}
.sign_btn button{
	width: 2rem;
	height: 0.45rem;
	color: #fff;
	text-align: center;
	outline: none;
	line-height: 0.45rem;
	border-radius: 0.2rem;
	border:none;
	background: linear-gradient(to right, rgba(60,162,255,1),rgba(60,162,255,0.8),rgb(102,206,255), rgb(114,218,255)); 
}
.sign_info,.sign_abstract{
	color: #333;
	font-size: 0.15rem;
	padding: 0.15rem;
}
.sign_info p{
	padding-bottom: 0.15rem;
}
</style>