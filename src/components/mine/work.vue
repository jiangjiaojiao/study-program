<template>
<div class="work">
	<h3>我的作业</h3>
	<div class="work_content">
	<div class="work_list" v-for='item in all_class'>
		<div class="work_left">
			<h3>{{item.name}}</h3>
			<p>上传作业时间：{{item.upload_time}}</p>
		</div>
		<div class="work_right">
			<p class="ok">
				合格
			</p>
			
		</div>
	</div>
	</div>
	<div class="upload_btn">
		<button @click="upload()">上传作业</button>
	</div>
</div>
</template>
<script>
	export default{
		name:'work',
		data(){
			return{
				all_class:[
					{
						name:'课程1',
						upload_time:'2018-03-04'
					},
					{
						name:'课程2',
						upload_time:'2018-04-06'
					},
					{
						name:'课程3',
						upload_time:'2018-06-07'
					}
				],
				sex:"fmale"
			}
		},
		components:{

		},
		methods:{
			upload(){
					if(this.sex == 'male'){
						$('.work_right p').addClass("ok");
				}else{
					$('.work_right p').addClass("unok");
				}
			}
		},
		mounted:function () {
			
		}
	}
</script>
<style scoped>
.ok{
    background: url('../.././images/ok_icon.png') no-repeat 80px center;
}
.unok{
    background: url('../.././images/unok_icon.png') no-repeat 80px center;
}
.unupload{
    background: url('../.././images/unupload_icon.png') no-repeat 80px center;
}
.ok,.unok,.unupload{
    background-size:27px;
}
</style>
