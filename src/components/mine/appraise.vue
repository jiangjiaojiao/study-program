<template>
<div class="appraise">
	<div class="appraise_head">
		<span @click="returnMine()"></span>
		<h3>我的评价</h3>
	</div>
	<Collapse simple>
        <Panel :name="item.id" :key="item.id" v-for='(item,index) in appraise_class'>
            <div class="appraise_right">
				<p>{{item.name}}</p>
				<p>讲师：{{item.teacher}}</p>
			</div>
            <p slot="content">{{item.abstract}}</p>
        </Panel>
    </Collapse>
</div>
</template>
<script>
	export default{
		name:'appraise',
		data(){
			return{
				appraise_class:[
					{
						id:'1',
						name:'课程1',
						teacher:'讲师',
						abstract:'这是评价'
					},
					{
						id:'2',
						name:'课程2',
						teacher:'讲师',
						abstract:'这是评价'
					},
					{
						id:'3',
						name:'课程3',
						teacher:'讲师',
						abstract:'这是评价'
					}
				],
				isShow:false
			}
		},
		components:{

		},
		methods:{
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
