<template>
<div class="plan">
	<!--全部课程-->
	<div class="all_class">
		<p @click="dropList()" class="drop_down">全部课程</p>
		<div class="classes" v-show="showClass">
			<ul>
				<li v-for="(item,index) in class_style" @click="change(item.id,index)">
					<b :class="activeIndex==index?'active':''">{{item.name}}</b>
				</li>
			</ul>
		</div>
	</div>
	<!--预约课程列表-->
	<div class="cc">
		<div class="plan_list" v-for="(item,key,index) in plan_list" :key='index'>
			<p><img :src="item.url"></p>
			<div>
				<h3>{{item.name}}</h3>
				<p>讲师：{{item.teacher}}</p>
				<p>时间：{{item.created_at}}</p>
				<p :class="item.prompt_class=='预约学习'?'prompt_style':'cancel_style'" @click="bespokeClass($event,item.created_at,item.name,item.id)">{{item.prompt_class}}</p>
			</div>
		</div>
	</div>
	<!-- <div class="set"></div> -->
	<Modal
	        v-model="modal1"
	        @on-ok="ok(prompt)"
	        @on-cancel="cancel">
	        <p>{{prompt}}预约{{class_time}}{{class_name}}</p>
	</Modal>
	<!--预约课程弹框-->
	<!-- <div class="modal" v-show="showModal">
		<div><p>{{prompt}}预约{{class_name}}</p></div>
		<p><button @click="ok(prompt)">确定</button><button @click='cancel()'>取消</button></p>
	</div> -->
	<!--预约已满提示弹框-->
	<!-- <div class="modal2" v-show="showModal2">
		已约满3节课，请完成后再进行预约
	</div>
	<div class="ivu-modal-mask mask2" v-show="showMask">
		
	</div>-->
	<div class="ivu-modal-mask mask1" v-show="showClass">
		
	</div>
	 
</div>
</template>
<script>
	export default{
		name:'plan',
		data(){
			return{
				prompt:'确定',
				prompt_class:'',
				plan_list:[],
				modal1:false,
				class_style:[
					{
						id:8,
						name:'全部'
					}
				],
				class_time:'',//课程时间
				class_name:'',//课程名称
				element:'',//当前元素
				showModal:false,//预约弹出层
				showModal2:false,//预约已满显示
				isDrop:true,//全部课程下拉
				showClass:false, //预约已满遮罩层
				showMask:false, //遮罩层
				class_id:'',
				activeIndex:0
			}
		},
		components:{

		},
		methods:{
			bespokeClass(event,time,name,id){
				/*预约学习*/
				//获取点击对象  
				this.class_id = id;
				this.element=event.currentTarget;    
		         var el = event.currentTarget;
		         if(el.innerHTML == '预约学习'){
		         	this.prompt = '确定';
		         }else{
		         	this.prompt = '取消';		         		         	
		         }
		         this.modal1 = true;
		         /*this.showModal=true;
		         this.showMask = true;*/
		         this.class_name = name;
		         this.class_time = time;	
			},
			ok(prompt){
				if(prompt == '确定'){
					/*预约课程*/
					this.changeStatus();				
				}else if(prompt == '取消'){
					/*取消预约*/
					this.cancelPrompt();
				}
				this.showModal=false;
				this.showMask = false;
			},
			changeStatus(){
				/*预约课程*/
				let _this = this;
				let student_id = window.localStorage.getItem('id');
				$.ajax({
                  type: 'POST',
                  dataType: 'json',
                  url: this.baseapath+'api/electives',
                  data:{
                  	student_id:student_id,
                  	class_id:this.class_id
                  },
                  success: function(response, textStatus, jqXHR){
			       		_this.element.innerHTML = '已预约';
			        	_this.element.style.color='red';
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  		if(jqXHR.status == 422){
                  			_this.element.innerHTML = '预约学习';
			       			_this.element.style.color='#5ea709';
                  			let responseMess =  jqXHR.responseJSON;
                  			responseMess.forEach(function(item){
                  				_this.$Message.error(item.message);
                  			})              		
                  		} 	
                  }
                })
			},
			cancelPrompt(){
				/*取消预约课程*/
				let student_id = window.localStorage.getItem('id');
				let _this = this;
				$.ajax({
                  type: 'DELETE',
                  dataType: 'json',
                  url: this.baseapath+'api/electives/'+student_id+','+this.class_id,
                  success: function(response, textStatus, jqXHR){
                  		_this.element.innerHTML = '预约学习';
			        	_this.element.style.color='#5ea709';
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  		if(jqXHR.status == 422){
                  			let responseMess =  jqXHR.responseJSON;
                  			responseMess.forEach(function(item){
                  				_this.$Message.error(item.message);
                  			})                 		
                  		} 	
                  }
                })
			},
			cancel(){
				/*取消*/
				this.showModal=false;
				this.showMask = false;
			},
			dropList(){
				/*采用定时器显示提示this.showModal2=true;*/
				this.isDrop = !this.isDrop;
				if(this.isDrop){
					$(".all_class p").removeClass("drop_top");
					$('.all_class p').addClass('drop_down');
					this.showClass=false;
				}else{
					$(".all_class p").removeClass("drop_down");
					$('.all_class p').addClass('drop_top');
					this.showClass=true;
				}
			},
			change(id,index){
				let _this = this;
				let url;
				_this.activeIndex = index;
				if(id == 8){
					url = _this.baseapath+'api/courses?unselected=1&expand=category,teacherProfile,elective&sort=-created_at'
				}else{
					url = _this.baseapath+'api/courses?unselected=1&filter[category_id]='+id+'&expand=category,teacherProfile,elective&sort=-created_at'
				}
				_this.getAllList(url);	
			},
			getAllList(url){
				let _this = this;
				_this.plan_list = [];
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:url,
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  		let items = response;
                  		items.forEach(function(item){
                  			if(item.elective == null){
                  				_this.prompt_class = '预约学习';
                  			}else{
                  				_this.prompt_class = '已预约';
                  			}
	                  		_this.plan_list.push({
	                  			id:item.id,//课程id
	                  			url:item.picture,//课程图片
	                  			name:item.title,//课程名称
	                  			teacher:item.teacherProfile.name,//讲师名字
	                  			created_at:_this.format(item.created_at),//学习数量
	                  			prompt_class:_this.prompt_class//预约状态
	                  		});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                })
			},
			getClassType(){
				//获取课程类型
				let _this = this;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/categories',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	response.forEach(function(item){
                  		_this.class_style.push({id:item.id,name:item.name});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			}
		},
		mounted:function () {
			let _this = this;
			let url = this.baseapath+'api/courses?unselected=1&expand=category,teacherProfile,elective&sort=-created_at'
			this.getAllList(url);
			this.getClassType();
			
		}
	}
</script>
<style scoped>
.all_class{
	width: 100%;
	height: 0.4rem;
	/* position: fixed; */
	position: relative;
	background-color: #fff;
	z-index: 1000;
}
.all_class p{
	width: 93%;
	height: 0.4rem;
	margin: 0 auto;
	border-bottom:1px solid #d8d8d8;
	line-height: 0.4rem;
	font-size: 13px;
	color: #838383;
}
.drop_down{
	background: url('../.././images/drop_down.png') no-repeat 60px center;
}
.drop_top{
	background: url('../.././images/drop_top.png') no-repeat 60px center;	
}
.drop_down,.drop_top{
	background-size: 20px 10px;
}
.classes{
	width: 100%;
	height: 0.8rem;
	background-color: #fff;
	position: absolute;
	left: 0;
	top: 0.4rem;
	z-index: 999;
}
.classes ul{
	height: 100%;
	display: flex;
	align-items: center;
}
.classes ul li{
	flex: 1;
	height: 100%;
	color: #232323 !important;
	display: flex;
	align-items: center;
	justify-content: center;
}
.classes ul li b{
	font-weight: normal;
}
.active{
	display: block;
	min-width: 40px;
	height: 28px;
	padding: 0 10px;
	text-align: center;
	line-height: 28px;
	color: #39b0fd;
	border: 1px solid #39b0fd; 
	border-radius: 0.2rem;
}
.mask1{
	z-index: 900;
}
.cancel_style{
	color: red;
}
.prompt_style{
	color: #5ea709;
}
.cc{
	position: relative;
	width: 93%;
	margin: 0 auto;
	height: auto;
	/* top: 0.4rem; */
}
.cc>div:last-child{
	border-bottom: none;
}
.content{
	padding-bottom: 0 !important;
}
</style>