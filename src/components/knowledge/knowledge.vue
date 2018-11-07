<template>
<div class="knowledge">
	<!--头部搜索栏-->
	<div class="head">
		<p>
			<span class="iconfont icon-sousuo"></span>
			<input type="text" name="search" class="search" placeholder="享学会" @focus="toSearch()">
		</p>
	</div>
	<!--banner-->
	<div class="banner">
		<!-- <img src="https://goss.veer.com/creative/vcg/veer/1600water/veer-167469995.jpg"> -->
		<Carousel autoplay v-model="value2" loop>
	        <CarouselItem v-for="item in banner_list">
	            <a :href="item.link"><img :src="item.picture" name="pic"></a>
	        </CarouselItem>
	    </Carousel>
	</div>
	<!--产品知识模块-->
	<div class="product" v-for="item in list">
		<div class="title">
			<h3>{{item.name}}</h3>
			<p>
				<span @click='toMore(item.id,item.name)'>更多<span class="iconfont icon-gengduo"></span></span>
				
			</p>
		</div>
		<allList :categoryId="item.id" :type="item.type"></allList>
	</div>
	<div class="clear"></div>
</div>
</template>
<script>
	import allList from './allList'  //引入child组件
	export default{
		name:'knowledge',
		data(){
			return{
				value2: 0,
				list:[],
				banner_list:[]
			}
		},
		components:{
			allList
		},
		methods:{
			getType(){
				//获取课程类型
				let _this = this;
				_this.list = [];
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/categories',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	response.forEach(function(item){
                  		_this.list.push({id:item.id,name:item.name,type:'pic'+item.id});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			},
			toSearch(){
				this.$router.push({'path':'/searchWord'});
			},
			toMore(id,type){
				this.$router.push({'path':'/more',query:{category_id:id,type:type}});
			},
			getBanner(){
				let _this = this;
				_this.banner_list = [];
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/booths?filter[type]=banner',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	response.forEach(function(item){
                  		_this.banner_list.push({id:item.id,link:item.link,picture:item.picture});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			}
		},
		mounted:function (){
			let _this = this;
			this.getType();
			this.getBanner();
		}
	}
</script>
<style scoped>

</style>