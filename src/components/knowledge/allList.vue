<template>
	<div>
		<!--产品banner-->
		<div class="product_banner">
			<!-- <img src="https://goss.veer.com/creative/vcg/veer/1600water/veer-312486780.jpg" alt=""> -->
			<Carousel autoplay v-model="value3">
	        <CarouselItem v-for="(item,index) in design_list" :key="index">
	            <a :href="item.link"><img :src="item.picture"></a>
	        </CarouselItem>
	    </Carousel>
		</div>
			<!--产品课程列表-->
		<div class="product_list">
			<div class="product_1" v-for='items in new_list' @click="goDetail(items.name,items.id)">
				<div><img :src="items.url"></div>
				<p><b>{{items.name}}</b><span>已修人数：{{items.number}}</span></p>
				<p>{{items.struct}}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default{
		name:'allList',
		props: {
			type:String,  //定义传值的类型<br> 
        	categoryId: String  //定义传值的类型<br>    
    	},
		data(){
			return{
				value3: 0,
				design_list:[],
				product_list:[],
				new_list:[]
			}
		},
		components:{
			
		},
		methods:{
			getBanner(){
				let _this = this;
				_this.design_list = [];
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/booths?filter[type]='+_this.type,
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  	response.forEach(function(item){
                  		_this.design_list.push({id:item.id,link:item.link,picture:item.picture});
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                });
			},
			getAllClass(){
				//获取课程类型
				let _this = this;

				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/courses?filter[category_id]='+this.categoryId+'&expand=category,teacherProfile&sort=-created_at',
                  data:{},
                  success: function(response, textStatus, jqXHR){
                  		let items = response;
                  		/*_this.product_list = [];*/
                  		items.forEach(function(item){
                  		_this.product_list.push({
                  			id:item.id,//课程id
                  			url:item.picture,//课程图片
                  			name:item.title,//课程名称
                  			number:item.complete_count,//学习数量
                  			struct:item.desc//课程描述
                  		});
                  		if(_this.product_list.length>4){
                  			_this.new_list = [];
                  			for(var i=0;i<4;i++){
								_this.new_list.push(_this.product_list[i]);
							}
                  		}else{
                  			_this.new_list = _this.product_list;
                  		}
                  	})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  	
                  }
                })
			},
			goDetail(title,id){
		         this.$router.push({'path':'/detail',query:{title:title,id:id}});
			}
		},
		mounted:function (){
			this.getAllClass();
			this.getBanner();
		}
	}
</script>
<style scoped>

</style>