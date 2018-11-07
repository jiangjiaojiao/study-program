<template>
<div class="detail">
	<div class="player">
		<video controls="controls" :poster="picture" ref="videos">
			<source :src="video" type="video/mp4"/>
			<source :src="video" type="video/webm"/>
			<source :src="video" type="video/ogg" />
			如果浏览器不支持video标签，则使用flash
			<embed :src="video" type="application/x-shockwave-flash"
			allowscriptaccess="always" allowfullscreen="true"></embed>              
		</video>
	</div>
	<div class="class_msg">
		<p>课程名称：{{name}}</p>
		<p>讲师：{{teacher}}</p>
		<P>时间：{{time}}</P>
	</div>
	<div class="class_abs">课程简介：{{abstract}}</div>
	<div class='sign_btn'>
		<button @click="modal2 = true">下载PPT</button>
	</div>	
	<Modal
        v-model="modal2"
        @on-ok="ok">
        <p>确定下载{{name}}课程ppt</p>
    </Modal>
	<!-- <div class="sign_btn">
		<button @click="signIn()">课程签到</button>
		<button @click="appraise()">评价课程</button>
	</div> -->
</div>
</template>
<script>
	export default{
		name:'detail',
		data(){
			return{
				modal2:false,
				class_id:'',//课程id
				picture:'',//课程图片
				video:'',//视频路径
				name:'',//课程名称
				teacher:'',//讲师名字
				time:'',//课程时间
				abstract:'',//课程描述
                model2: 1,
                classId:'',//课程id
                isSign:false,//是否签到
                class_state:false,
                isPlay:false,//是否播放
                file:''
			}
		},
		components:{

		},
		methods:{
			getClassInfo(state){
				let _this=this;
				let title = this.$route.query.title;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/courses?filter[title]='+title+'&expand=category,teacherProfile',
                  data:{},
                  /*async:false,*/
                  success: function(response, textStatus, jqXHR){
                  		let items = response[0];
                  		_this.class_id = items.id;
                  		_this.name = items.title;
                  		_this.teacher = items.teacherProfile.name;
                  		_this.time = _this.format(items.created_at);
                  		_this.abstract = items.desc;
                  		/*_this.video = items.video;*/
                  		/*_this.$refs.videos.src = items.video;*/
                  		_this.$refs.videos.src = state == false ? '' : items.video;
                  		_this.picture = items.picture;
                  		_this.file = items.document;
                  		/*_this.videoIsEnd(2,'check');*/
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                })
			},
			returnIndex(){
				this.$router.push({'path':'/'});
			},
			videoIsEnd(state,word){
				let _this = this;
				let student_id = window.localStorage.getItem('id');
				let class_id = this.$route.query.id;
				let url;
				if(!class_id){
					url=_this.baseapath+"api/electives/"+student_id+','+_this.class_id;
				}else{
					url=_this.baseapath+"api/electives/"+student_id+','+class_id;
				}
			    $.ajax({
	                  type: 'PUT',
	                  dataType: 'json',
	                  data:{
	                  	status :state
	                  },
	                  url:url,
	                  success: function(response, textStatus, jqXHR){
	                  		_this.getClassInfo(true);
	                  		_this.isPlay = true;
	                  },
	                  error: function(jqXHR, textStatus, errorThrown){
	                  		_this.getClassInfo(false);
	                  		_this.isPlay = false;
	                  		if(jqXHR.status == 422){
	                  			let responseMess =  jqXHR.responseJSON;
	                  			responseMess.forEach(function(item){
	                  				_this.$Message.error(item.message);
	                  			})                 		
                  			}else if(word=='check'){
                  				if(jqXHR.status == 404){
	                  				if(jqXHR.responseJSON.code == 0){
			                  			_this.$Message.error('未预约该课程！');
			                  		}
	                  			}
                  			}
	                  }
                	});
			},
			ok(){
				if(this.file){
					location.href = this.file;
				}else{
					this.$Message.error('该课程未上传ppt！');
				}
				
			}
		},
		watch: {
		    isPlay: function(curVal,oldVal){
		        this.isPlay = curVal;
		        let _this = this;
		        if (curVal) {
			        //监听播放时间
					var video=document.getElementsByTagName("video")[0];			
					//使用事件监听方式捕捉事件
					video.addEventListener("timeupdate",function(){
						var timeDisplay;
						var total;
						//用秒数来显示当前播放进度
						timeDisplay = Math.floor(video.currentTime);
						total=video.duration;
						//当视频播放到 4s的时候做处理
						/*用户未播放完课程视频*/
						if(timeDisplay < total && _this.$route.path != '/detail'){
							    _this.videoIsEnd(2,'normal');
							    return;
						}
					},false);
					//视频播放结束
					video.addEventListener("ended",function(){
						_this.videoIsEnd(9,'normal');
					});
		        }else{		        	
		        }
		    },
		},
		mounted:function () {
			let _this = this;
			_this.videoIsEnd(2,'check');
			/*_this.getClassInfo();*/
		}
	}
</script>
<style scoped>
.player>video{
	width: 100%;
	height: 2.6rem;
}
.class_msg{
	width: 100%;
	height: auto;
	padding: 0.1rem;
	border-bottom: 1px solid #d8d8d8;
}
.class_msg>p{
	height: 0.4rem;
	line-height: 0.4rem;
	color: #333;
	font-size: 13px;
}
.class_abs{
	width: 100%;
	min-height: 1.2rem;
	padding: 0.25rem 0.1rem;
	color: #333;
	font-size: 13px;
}
.sign_btn{
	width: 100%;
	height: 0.5rem;
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
	margin-bottom: 0.1rem;
	background-color: #E77D25;
}
</style>
