<template>
<div class="more">
	<div class="more_head">
		<span @click="returnMine()"></span>
		<h3>{{type}}</h3>
	</div>
	<div class="more_list" v-for='item in all_class'  @click="toClass(item.name,item.id)">
		<p><img :src="item.url"></p>
		<div class="list_right">
			<h3>{{item.name}}</h3>
			<p>讲师：{{item.teacher}}</p>
			<p>{{item.number}}人学过</p>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'more',
		data(){
			return{
				all_class:[],
				title:'',
				type:''
			}
		},
		components:{

		},
		methods:{
			getAllList(){
				let _this = this;
				let category_id = this.$route.query.category_id;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/courses?filter[category_id]='+category_id+'&expand=category,teacherProfile&sort=-created_at',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  		let items = response;
                  		items.forEach(function(item){
                  		_this.all_class.push({
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
                })
			},
			toClass(title,id){
				this.$router.push({'path':'/detail',query:{title:title,id:id}});
			},
			returnMine(){
				this.$router.push({'path':'/'});
			}
		},
		mounted:function () {
			this.getAllList();
			this.type = this.$route.query.type;
		}
	}
</script>
<style scoped>

</style>
