<template>
<div class="searchWord">
	<!--搜索栏-->
	<div class="class_word">
		<p>
			<span class="iconfont icon-sousuo"></span>
			<input type="text" name="search" class="search_word" placeholder="享学会" v-model="word">
		</p>
		<span @click="cancel()">取消</span>
	</div>
	<!--关键词区域-->
	<div class="keyword" v-show="isShow">
		<h3>热门课程</h3>
		<div class="hot_class">
			<span v-for='item in hot_class' @click="toResult(item.name)">{{item.name}}</span>
		</div>
	</div>
	<!--搜索结果区域-->
	<div class="result" v-show="!isShow">
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
		name:'searchWord',
		data(){
			return{
				hot_class:[],
				class_result:[],
				isShow:true,
				isEnd:true,
				word:''
			}
		},
		components:{

		},
		watch:{
			word(curVal,oldVal){
				this.search(curVal);
				if(curVal){
					this.isShow = false;
				}else{
					this.isShow = true;
				}
			}
		},
		methods:{
			hotWord(){
				//关键字列表显示
				let _this = this;
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/content/search-keyword',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	response.forEach(function(item){
                  		_this.hot_class.push({name:item});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			},
			cancel(){
				//取消
				this.$router.push({'path':'/'});
			},
			search(word){
				//搜索结果
				let _this = this;
				_this.class_result = []
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
				//点击关键字进入课程
				/*$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/courses?filter[title][like]='+str,
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });*/
                this.$router.push({'path':'/detail',query:{title:str,id:id}});
			},
			toResult(name){
				this.$router.push({'path':'/searchResult',query:{word:name}});
			}
		},
		mounted:function () {
			this.hotWord();
		}
	}
</script>
<style scoped>

</style>