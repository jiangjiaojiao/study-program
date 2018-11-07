<template>
<div class="repair">
	<h3>已修课程</h3>
	<div class="repair_list" v-for='item in all_class'>
		<img :src="item.url">
		<div class="repair_right">
			<h3>{{item.name}}</h3>
			<p>讲师：{{item.teacher}}</p>
			<p>{{item.number}}人学过</p>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'repair',
		data(){
			return{
				all_class:[
					{
						name:'课程1',
						teacher:'江娇娇',
						number:'20',
						url:'https://goss.veer.com/creative/vcg/veer/1600water/veer-153657559.jpg'
					},
					{
						name:'课程2',
						teacher:'江娇娇',
						number:'30',
						url:'https://goss.veer.com/creative/vcg/veer/1600water/veer-153657559.jpg'
					},
					{
						name:'课程3',
						teacher:'江娇娇',
						number:'40',
						url:'https://goss.veer.com/creative/vcg/veer/1600water/veer-153657559.jpg'
					}
				],
				title:''
			}
		},
		components:{

		},
		methods:{
			
		},
		mounted:function () {
			
		}
	}
</script>
<style scoped>

</style>
