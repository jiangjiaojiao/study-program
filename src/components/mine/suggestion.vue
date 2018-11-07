<template>
<div class="suggestion">
	<div class="suggestion_head">
		<span @click="returnMine()"></span>
		<h3>意见反馈</h3>
	</div>
	<div>
		<textarea style="width:100%; height:100%" v-model="formItem.content" v-bind:maxlength="500" @input="descArea" placeholder="填写意见"></textarea>
		<p>{{Surplus}}/500?</p>
	</div>
	<p class="upload_btn">
		<button @click="putSuggestion()">提交意见</button>
	</p>
</div>
</template>
<script>
	export default{
		name:'suggestion',
		data(){
			return{
				formItem:{
					content:''
				},
				Surplus:0
			}
		},
		components:{

		},
		methods:{
			descArea(){
				var textVal = this.formItem.content.length;
      			this.Surplus = textVal;
      			if(this.Surplus>500){
      				this.$Message.warning('意见请控制在500字以内！');
      			}
			},
			putSuggestion(){
				let _this=this;
				$('.ivu-message-notice').hide();
				console.log(this.formItem.content);
				$.ajax({
	                  type: 'POST',
	                  dataType: 'json',
	                  data:{
	                  	content:_this.formItem.content
	                  },
	                  url:this.baseapath+"api/suggestions",
	                  success: function(response, textStatus, jqXHR){
	                  	_this.$Message.success('提交意见成功！');
	                   	_this.formItem.content = '';
	                  },
	                  error: function(jqXHR, textStatus, errorThrown){
	                  	if(jqXHR.status == 422){
	                  		let responseMess =  jqXHR.responseJSON;
	                  			responseMess.forEach(function(item){
	                  				_this.$Message.error(item.message);
	                  			}) 
	                  		/*_this.$Message.error(jqXHR.responseJSON.message);*/
	                  	}
	                  	/*_this.$Message.error('提交意见失败！');*/
	                  }
                });
			},
			returnMine(){
				this.$router.push({'path':'/mine'});
			}
		},
		mounted:function () {
			
		}
	}
</script>
<style scoped>
</style>
