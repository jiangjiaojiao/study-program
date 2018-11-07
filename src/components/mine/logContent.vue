<template>
<div>
	<!--选项卡-->
	<div class="log_content">
		<div class="log_one">
				<p><Icon type="ios-bookmarks" />作业分:{{assignment == null ? 0 :assignment}}分</p>
				<p><Icon type="md-chatbubbles" />课程互评分:{{interaction == null ? 0 :interaction}}分</p>
		</div>
		<div class="log_two">
				<p><Icon type="md-contacts" />团队精神分:{{teamwork == null ? 0 :teamwork}}分</p>
				<p><Icon type="md-home" />出勤分:{{attendance == null ? 0 :attendance}}分</p>
		</div>
	</div>
				
				<!-- <div class="log_list">
					<div :class="c_list">
							        	<div class="work_score">
							        		<p>作业分</p>
							        		<div><p><span></span></p></div>
							        		<p>{{assignment}}分</p>
							        	</div>
							        	<div class="class_score">
							        		<p>课程互评分</p>
							        		<div><p><span></span></p></div>
							        		<p>{{interaction}}分</p>
							        	</div>
							        	<div class="team_score">
							        		<p>团队精神分</p>
							        		<div><p><span></span></p></div>
							        		<p>{{teamwork}}分</p>
							        	</div>
							        	<div class="duty_score">
							        		<p>出勤分</p>
							        		<div><p><span></span></p></div>
							        		<p>{{attendance}}分</p>
							        	</div>
						        	</div>
				</div> -->
				
		        <!-- <div class="log_list shop_list">
		        	<div class="work_score">
		        		<p>作业分</p>
		        		<div><p><span></span></p></div>
		        		<p>{{work_score}}分</p>
		        	</div>
		        	<div class="class_score">
		        		<p>课程互评分</p>
		        		<div><p><span></span></p></div>
		        		<p>{{class_score}}分</p>
		        	</div>
		        	<div class="team_score">
		        		<p>团队精神分</p>
		        		<div><p><span></span></p></div>
		        		<p>{{team_score}}分</p>
		        	</div>
		        	<div class="duty_score">
		        		<p>出勤分</p>
		        		<div><p><span></span></p></div>
		        		<p>{{duty_score}}分</p>
		        	</div>
		        </div> -->
</div>
</template>
<script>
	export default{
		name:'log',
		props: {
			id:String,
			attendance:Number,
			assignment:Number,
			interaction:Number,
			teamwork:Number,
        	categoryId: String  //定义传值的类型<br>    
    	},
		data(){
			return{
					/*work_score:'0',
					class_score:'0',
					team_score:'0',
					duty_score:'0',
					c_list:''*/			
			}
		},
		components:{

		},
		methods:{
			/*changeMenu(){
				//根据不同的课程类型显示分数情况
				this.c_list='class'+this.id;
				$('.'+this.c_list+'>.work_score span').css({
				'width':this.assignment*80+'%',
				'background':'linear-gradient(to right, rgba(67,115,255,0.1),rgba(67,115,255,'+Number(this.assignment/1.25)+'))'
				});
				$('.'+this.c_list+'>.class_score span').css({
					'width':this.interaction*80+'%',
					'background':'linear-gradient(to right, rgba(209,49,255,0.1),rgba(209,49,255,'+Number(this.interaction/1.25)+'))'
				});
				$('.'+this.c_list+'>.team_score span').css({
					'width':this.teamwork*80+'%',
					'background':'linear-gradient(to right, rgba(57,215,154,0.1),rgba(57,215,154,'+Number(this.teamwork/1.25)+'))'
				});
				$('.'+this.c_list+'>.duty_score span').css({
					'width':this.attendance*80+'%',
					'background':'linear-gradient(to right, rgba(255,174,58,0.1),rgba(255,174,58,'+Number(this.attendance/1.25)+'))'
				});
			},*/
			/*getScore(){
				let _this = this;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/user/score?list=1&category_id='+this.categoryId,
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  		_this.work_score = response.grade_assignment == null ? 0 : response.grade_assignment;
                  		_this.class_score = response.grade_interaction == null ? 0 : response.grade_interaction;
                  		_this.team_score = response.grade_teamwork == null ? 0 : response.grade_teamwork;
                  		_this.duty_score = response.grade_attendance == null ? 0 : response.grade_attendance;
                  		_this.changeMenu();
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			}*/
		},
		created: function () {
			/*this.changeMenu();*/
		},
		mounted:function () {
			/*this.getScore();*/
			/*this.changeMenu();*/
		}
	}
</script>
<style scoped>
.log_content{
	width: 95%;
	height: auto;
	margin:0 auto;
	padding-bottom: 0.2rem;
}
.log_one,.log_two{
	width: 100%;
	height: auto;
	display: flex;
}
.log_one p,.log_two p{
	flex: 1;
	color: #333;
	height: 0.3rem;
	line-height: 0.3rem;
	font-size: 14px;
}
.log_one p i,.log_two p i{
	padding-right: 0.1rem;
}
/* .log_list{
	
}
.log_list>div>div{
	width: 100%;
	height: 0.5rem;
	border-bottom: 1px solid #d8d8d8;
	display: flex;
	align-items: center;
}
.log_list>div>div>div{
	flex: 1;
}
.log_list>div>div>div>p{
	width: 75%;
	height: 0.1rem;
	border-radius: 0.1rem;
	position: relative;
}
.log_list>div>div:nth-of-type(1)>div>p{
	border:1px solid #ccd9ff;
}
.log_list>div>div:nth-of-type(2)>div>p{
	border:1px solid #f8d8ff;
}
.log_list>div>div:nth-of-type(3)>div>p{
	border:1px solid #daf5e9;
}
.log_list>div>div:nth-of-type(4)>div>p{
	border:1px solid #ffbc5c;
}
.log_list>div>div>div>p>span{
	display: block;
	position: absolute;
	height: 0.1rem;
	border-radius: 0.1rem;
    margin-bottom: 0.1rem;
}
.log_list>div>div>p:nth-of-type(1){
	width: 1rem;
	color: #333;
	font-size: 14px;
	padding-left:0.1rem;
}
.log_list>div>div>p:nth-of-type(2){
	width: 0.84rem;
	color: #666;
	font-size: 12px;
} */
</style>
