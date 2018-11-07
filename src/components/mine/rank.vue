<template>
<div class="rank">
	<div class="rank_head">
		<span @click="returnScore()"></span>
		<h3>排行榜</h3>
	</div>
	
	<div class="rank_content">
		<div>
			<div class="rank_list" v-for='(item,index) in score_list'>
				<div>
					<p><span>{{index+1}}</span>{{item.name}}</p>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'rank',
		data(){
			return{
				score_list:[
					/*{
						name:'第一名'
					},
					{
						name:'第二名'
					},
					{
						name:'第三名'
					},
					{
						name:'第一名'
					},
					{
						name:'第二名'
					},
					{
						name:'第三名'
					}*/
				]
			}
		},
		components:{

		},
		methods:{
			returnScore(){
				this.$router.push({'path':'/getScore'});
			},
			getRankList(){
				let _this = this;
				_this.score_list = [];
				$.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url: this.baseapath+'api/user/score-ranking?limit=10',
                  success: function(response, textStatus, jqXHR){
                  		var items = response;
                  		items.forEach(function(item){
                  			_this.score_list.push({name:item.studentProfile.name})
                  		})
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                  			
                  }
                })
			}
		},
		mounted:function () {
			this.getRankList();
		}
	}
</script>
<style scoped>
.rank{
	width: 100%;
	height: 100%;
	background-color: #f3f5f7;
}
.rank_content{
	width: 100%;
	padding: 0 0.1rem;
}
.rank_content>div{
	padding: 0 0.1rem;
	width: 100%;
	height: 100%;
	background-color: #fff;
	border-bottom-right-radius:0.1rem;
	border-bottom-left-radius:0.1rem;
}
.rank_list{
	width: 100%;
	height: 0.55rem;
	line-height: 0.55rem;
	font-size: 16px;
	color: #313131;
	border-bottom: 2px solid #eef9ff;
}
.rank_content>div>div:last-child{
	border-bottom: none;
}
.rank_list p{
	display: flex;
}
.rank_list span{
	display: block;
	width: 0.25rem;
	height: 100%;
	text-align: center;
	line-height: 0.55rem;
	margin-right: 0.23rem;
}
.rank>h3{
	width: 100%;
	height: 0.4rem;
	line-height: 0.4rem;
	border-bottom: 1px solid #d8d8d8;
	text-align: center;
	color: #333;
	font-size: 16px;
	background-color: #fff;
}
</style>
