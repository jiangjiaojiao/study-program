<template>
<div class="study">
    <Tabs v-model="currentName">
            <TabPane label="预约课程" name="name1">
                <plan></plan>
            </TabPane>
            <TabPane label="已修课程" name="name2">
                <finished></finished>
            </TabPane>
    </Tabs>
</div>
</template>
<script>
    import finished from '../study/finished'
    import plan from '../study/plan' 
	export default{
		name:'study',
		data(){
			return{
				theme1:'light',
				activeName:'1',
                currentName:'name1'
			}
		},
		components:{
            finished,
            plan
		},
		methods:{
			changeMenu(name){
				switch(name){
                    case '1':
                        this.$router.push({'path':'/study'});
                    break;
                    case '2':
                        this.$router.push({'path':'/finished'});
                    break;
                }
			}
		},
        watch:{
            currentName(curval,oldval){
                this.currentName=curval;
            }
        },
		mounted:function () {
			let path = this.$route.path;
            switch(path){
                case '/study':
                    name = '1';
                break;
                case '/finished':
                    name = '2';
                break;
            }
            this.activeName = name;
		}
	}
</script>
<style scoped>
</style>