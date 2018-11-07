<template>
<div class="finished">
	<p class="total">
		已完成{{num}}个课程
	</p>
	<div class="ff">
		<div class="finished_list" v-for="item in finished_list" @click="goDetail(item.name,item.id)">
			<p><img :src="item.picture"></p>
			<div>
				<h3>{{item.name}}</h3>
				<p>讲师：{{item.teacher}}</p>
				<p>{{item.number}}人学过</p>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'finished',
		data(){
			return{
				num:30,
				finished_list:[]
			}
		},
		components:{
			
		},
		methods:{
			goDetail(title,id){
		        this.$router.push({'path':'/detail',query:{title:title,id:id}});
			},
			getFinishedList(){
				let _this = this;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url: this.baseapath+'api/electives?expand=class.teacherProfile',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  		let items = response;
                  		items.forEach(function(item){
                  			//筛选出已完成的课程
                  			if(item.status == 9){
                  				_this.finished_list.push({
                  					id:item.class_id,//课程id
		                  			name:item.class.title,//课程名称
		                  			teacher:item.class.teacherProfile.name,//讲师名字
		                  			picture:item.class.picture,//课程图片
		                  			number:item.class.complete_count//学习数量
		                  		});
                  			}
                  		})
                  		_this.num = _this.finished_list.length;
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                })
			}
		},
		mounted:function () {
			this.getFinishedList();
		}
	}
</script>
<style scoped>
.finished{
	width: 100%;
	height: 100%;
}
.ff{
	width: 93%;
	margin: 0 auto;
	height: auto;
}
.ff>div:last-child{
	border-bottom: none;
}
</style>