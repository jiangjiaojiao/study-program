<template>
<div class="searchResult">
	<div class="log_head">
		<span @click="returnSearch()"></span>
		<h3>热搜课程</h3>
	</div>
	<!--搜索结果区域-->
	<div class="result">
		<div v-for="item in class_result" @click="toClass(item.name,item.id)">
			<p><img :src="item.url"></p>
			<div>
				<p>{{item.name}}</p>
				<p>讲师：{{item.teacher}}</p>
				<p><span>{{item.number}}学过</span></p>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'searchResult',
		data(){
			return{
				class_result:[]
			}
		},
		components:{

		},
		methods:{
			search(){
				//搜索结果
				let _this = this;
				_this.class_result = [];
				let word = this.$route.query.word;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/courses?filter[title][like]='+word+'&expand=category,teacherProfile&sort=-created_at',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	response.forEach(function(item){
                  		_this.class_result.push({
                  			id:item.id,//课程id
                  			url:item.picture,//课程图片
                  			name:item.title,//课程名称
                  			teacher:item.teacherProfile.name,//讲师名字
                  			number:item.complete_count//学习数量
						});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			},
			toClass(str,id){
                this.$router.push({'path':'/detail',query:{title:str,id:id}});
			},
			returnSearch(){
				this.$router.push({'path':'/searchWord'});
			}
		},
		mounted:function () {
			this.search();
		}
	}
</script>
<style scoped>

</style>