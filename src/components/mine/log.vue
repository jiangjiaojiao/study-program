<template>
<div class="log">
	<div class="log_head">
		<span @click="returnMine()"></span>
		<h3>评分日志</h3>
	</div>
	<!--选项卡-->
	<div class="log_info">
		<!-- <Tabs v-model="currentName">
			        <TabPane :label="item.name" :name="item.sort" v-for="item in list">
			        	<logContent :categoryId="item.id"></logContent>
			    	</TabPane>
			    </Tabs> -->
		<div v-for="item in list">
			<div class="tt_mess">
					<p>{{item.title}}</p>
					<span>讲师：{{item.teacher}}</span>
			</div>
			<logContent :id="item.id" :attendance="item.grade_attendance" :assignment="item.grade_assignment" :interaction="item.grade_interaction" :teamwork="item.grade_teamwork"></logContent>    
		</div>
	</div>
</div>
</template>
<script>
	import logContent from './logContent'
	export default{
		name:'log',
		data(){
			return{
				currentName:'name01',
				list:[
					/*{
						id:'2',
						title:'测试课程1',
						teacher:'江娇娇',
						grade_attendance:1.2,
						grade_assignment:1.3,
						grade_interaction:1.4,
						grade_teamwork:1.5
					},
					{
						id:'3',
						title:'测试课程2',
						teacher:'江娇娇',
						grade_attendance:1.2,
						grade_assignment:1.3,
						grade_interaction:1.4,
						grade_teamwork:1.5
					},
					{
						id:'4',
						title:'测试课程3',
						teacher:'江娇娇',
						grade_attendance:1.2,
						grade_assignment:1.3,
						grade_interaction:1.4,
						grade_teamwork:1.5
					}*/
				]			
			}
		},
		components:{
			logContent
		},
		methods:{
			/*getTitle(){
				let _this = this;
				_this.list = [];
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/categories',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	response.forEach(function(item,index){
                  		_this.list.push({sort:'name'+index+1,id:item.id,name:item.name});
                  	})
                  	console.log(_this.list);
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			},*/
			getMess(){
				let _this = this;
				_this.list = [];
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/stu-classes?expand=class.teacherProfile',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	response.forEach(function(item,index){
                  		_this.list.push({
                  			id:item.class_id,//课程id
                  			title:item.class.title, //课程名称
                  			teacher:item.class.teacherProfile.name,//老师名称
                  			grade_attendance:item.grade_attendance,//出勤
                  			grade_assignment:item.grade_assignment,//作业
                  			grade_interaction:item.grade_interaction,//互评
                  			grade_teamwork:item.grade_teamwork//团队
                  		});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			},
			returnMine(){
				this.$router.push({'path':'/mine'});
			}
		},
		/*watch:{
			currentName(curval,oldval){
				this.currentName=curval;
			}
		},*/
		mounted:function () {
			this.getMess();
		}
	}
</script>
<style scoped>
.log_info>div{
	padding-left: 0.1rem;
	padding-right: 0.1rem;
}
.tt_mess{
	width: 95%;
	height: 0.4rem;
	margin:0 auto; 
	display: flex;
	border-bottom: 1px solid #d8d8d8;
}
.tt_mess p{
	flex: 1;
	height: 0.4rem;
	line-height: 0.4rem;
	color: #333;
	padding-left: 0.1rem;
	font-weight: bold;
	font-size: 14px;
	overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.tt_mess span{
	display: block;
	width: 30%;
	height: 100%;
	line-height: 0.4rem;
	color: #999;
	font-size: 10px;
	text-align: right;
	padding-right: 0.1rem;
}
</style>
