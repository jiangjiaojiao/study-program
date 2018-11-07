<template>
<div class="getScore">
	<div class="score_head">
		<span @click="returnMine()"></span>
		<h3>已得学分</h3>
		<span @click="toRank()">排行榜</span>
	</div>
	<div class="score_list" v-for='(item,index) in score_list'>
		<div>
			<p>{{item.name}}</p>
			<p>讲师：{{item.teacher}}</p>
		</div>
		<p>{{item.score}}分</p>
	</div> 
</div>
</template>
<script>
	export default{
		name:'getScore',
		data(){
			return{
				score_list:[]
			}
		},
		components:{

		},
		methods:{
			scoreList(){
				let _this = this;
				_this.score_list = [];
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/stu-classes?expand=class.teacherProfile',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  		let items = response;
                  		items.forEach(function(item){
                  		_this.score_list.push({
                  			name:item.class.title,//课程名称
                  			teacher:item.class.teacherProfile.name,//讲师名字
                  			score:item.grade_total//总分
                  		});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                })
			},
			toRank(){
				this.$router.push({'path':'/rank'})
			},
			returnMine(){
				this.$router.push({'path':'/mine'})
			}
		},
		mounted:function () {
			this.scoreList();
		}
	}
</script>
<style scoped>

</style>
