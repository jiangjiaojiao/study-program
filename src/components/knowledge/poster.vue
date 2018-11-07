<template>
<div class="poster">
	<div class="poster_head">
		<span @click="returnMine()"></span>
		<h3>课程名称</h3>
	</div>
	<div class="poster_list" v-for='item in poster_list'>
		<img :src="item.url">
	</div>
</div>
</template>
<script>
	export default{
		name:'poster',
		data(){
			return{
				poster_list:[
					{
						url:'https://goss.veer.com/creative/vcg/veer/800water/veer-300426634.jpg'
					},
					{
						url:'https://goss.veer.com/creative/vcg/veer/800water/veer-145676157.jpg'
					},
					{
						url:'https://goss.veer.com/creative/vcg/veer/800water/veer-164363246.jpg'
					}
				]
			}
		},
		components:{

		},
		methods:{
			returnMine(){
				this.$router.push({'path':'/index'});
			}
		},
		mounted:function () {
			
		}
	}
</script>
<style scoped>

</style>
