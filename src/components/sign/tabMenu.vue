<template>
<div class="tabMenu">
    <Menu mode="horizontal" :theme="theme1" :active-name="activeName" @on-select="changeMenu">
        <MenuItem name="1">
            <Icon type="ios-paper"></Icon>
            课程签到
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people"></Icon>
            个人中心
        </MenuItem>
    </Menu>
    <div class="sys-content">
           <router-view></router-view> 
    </div>
</div>
</template>
<script>
    export default{
        name:'tabMenu',
        data(){
            return{
                theme1:'light',
                activeName:'1',
                class_id:''
            }
        },
        components:{
        },
        mounted(){
            this.class_id = this.$route.query.class_id;
            console.log(this.class_id);
            let path = this.$route.path;
            switch(path){
                case '/tabMenu':
                    name = '1';
                break;
                case '/selfCenter':
                    name = '2';
                break;
            }
            this.activeName = name;
        },
        methods:{
            changeMenu(name){
                switch(name){
                    case '1':
                        this.$router.push({'path':'/tabMenu',query:{class_id:this.class_id}});
                    break;
                    case '2':
                        this.$router.push({'path':'/selfCenter'});
                    break;
                }
            }
        }
    }
</script>
<style scoped>
.ivu-menu{
    display: flex;
}
.ivu-menu li{
    flex:1;
    text-align: center; 
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>