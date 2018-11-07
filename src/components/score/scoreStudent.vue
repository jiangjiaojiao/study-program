<template>
<div class="score">
    <div class="score_info">
        <Card>
        <p slot="title">
            <Icon type="android-clipboard"></Icon>
            评分
        </p>
        <div class="share_info">
            <p>分享主题：{{title}}</p>
            <p>分享人：{{person}}</p>
            <p>分享日期：{{time}}</p>
        </div>
        <div class="share_score">
            <h3>针对分享人</h3>
            <div v-for="(item,index) in share">
                <p>{{index+1}}.{{item.name}}</p>
                        <RadioGroup v-model="item.radio">
                            <Radio label="5">5分</Radio>
                            <Radio label="4">4分</Radio>
                            <Radio label="3">3分</Radio>
                            <Radio label="2">2分</Radio>
                            <Radio label="1">1分</Radio>
                        </RadioGroup>
            </div>
            <h3>针对分享组织</h3>
            <div v-for="(item,index) in team">
                <p>{{index+1}}.{{item.name}}</p>
                        <RadioGroup v-model="item.radio">
                            <Radio label="5">5分</Radio>
                            <Radio label="4">4分</Radio>
                            <Radio label="3">3分</Radio>
                            <Radio label="2">2分</Radio>
                            <Radio label="1">1分</Radio>
                        </RadioGroup>
            </div>
            <h3>收获（可多选）</h3>
            <div v-for="(items,index) in results">
                <p>{{index+1}}.{{items.name}}</p>
                        <CheckboxGroup v-model="gain">
                            <Checkbox :label="item" v-for="item in items.content">{{item}}</Checkbox>
                        </CheckboxGroup>
            </div>
        </div>
        </Card>
    </div>
    <div class="score_btn">
        <button @click="subScore">提交评分</button>
    </div>
</div>
</template>
<script>
    export default{
        name:'score',
        data(){
            return{
                share:[],
                team:[],
                results:[],           
                gain:[],
                sum1:0,
                sum2:0,
                noGard:false,
                title:'',//课题名称
                person:'',//讲师
                time:'',//时间
                class_id:'',//课程id
                grade_s2t:'',
                grade_s2o:'',
                harvest:'',
                radio:'',
                collect:[],
                isNull:false
            }
        },
        components:{

        },
        methods:{
            getQuestion(){
                let _this = this;
                _this.share = [];
                _this.team = [];
                _this.results = [];
                $.ajax({
                      type: 'GET',
                      contentType: 'application/json',
                      dataType:"json",
                      data: {},
                      url:_this.baseapath+'api/questions',
                      success: function(response, textStatus, jqXHR){
                            let items = response;
                            items.forEach(function(item){
                                if(item.to == 1){
                                    _this.share.push({
                                        name:item.title,
                                        radio:''
                                    })
                                }else if(item.to == 2){
                                    _this.team.push({
                                        name:item.title,
                                        radio:''
                                    })
                                }else if(item.to == 3){
                                    let arr = item.content.split("\n");
                                    _this.results.push({
                                        name:item.title,
                                        content:arr
                                    })
                                }
                            })
                      },
                      error: function(jqXHR, textStatus, errorThrown){
                        /*_this.$Message.error(jqXHR.responseJSON.message);*/
                        /*_this.$router.push({'path':'/login',query:{path:_this.$route.path,class_id:_this.$route.query.class_id}});*/
                      }
                });
            },
            subScore(data){
                let _this = this;
                $('.ivu-message-notice').hide();
                _this.collect = [];
                //选项不为空
                _this.share.forEach(function(item){
                     _this.collect.push(item.radio);
                })
                _this.team.forEach(function(item){
                    _this.collect.push(item.radio);
                })
                _this.collect.forEach(function(item){
                    if(item == ''){
                        _this.isNull = true;
                    }
                })
                if(_this.isNull&&_this.gain.length == 0){
                    _this.$Message.warning('请进行评分！');
                }else if(this.grade_s2t || this.grade_s2o || this.harvest){
                    //判断是否已经评分
                    this.$Message.warning('请勿重复评分！');
                    return;
                }else{
                    let _this=this;
                    var str='';
                    _this.sum1=0;
                    _this.sum2=0;
                    var class_id = _this.$route.query.class_id;
                    //获取学生id和课程id
                    let student_id=window.localStorage.getItem('id');
                    _this.share.forEach(function(item){
                        _this.sum1 += Number(item.radio); 
                    })
                    _this.team.forEach(function(item){
                        _this.sum2 += Number(item.radio); 
                    })
                    //计算评分平均
                    this.sum1=(this.sum1/this.share.length).toFixed(2);
                    this.sum2=(this.sum2/this.team.length).toFixed(2);
                    this.gain.forEach(function(item){
                        str+=item+'\n';
                    })
                    //提交评分
                    $.ajax({
                      type: 'PUT',
                      contentType: 'application/json',
                      dataType:"json",
                      data: { 
                        grade_s2t: _this.sum1,
                        grade_s2o:_this.sum2,
                        harvest:str
                      },
                      url:_this.baseapath+'api/stu-classes/'+student_id+','+class_id,
                      success: function(response, textStatus, jqXHR){
                            _this.grade_s2t = response.grade_s2t;
                            _this.grade_s2o = response.grade_s2o;
                            _this.harvest = response.harvest;
                            _this.$Message.success('提交成功！');
                            setTimeout(function(){
                                _this.$router.push({path: '/thank'});
                            },2000)
                      },
                      error: function(jqXHR, textStatus, errorThrown){
                        if(jqXHR.status == 404){
                            _this.$Message.error('如未签到请先签到！');
                            return;
                        }else if(jqXHR.status == 422){
                            _this.$Message.error('请进行评分！');
                        }
                      }
                    });
                }
            },
            //获取课程信息
            getInfo(){
                let _this=this;
                let id = _this.$route.query.class_id;
                $.ajax({
                  type: 'GET',
                  dataType: 'json',
                  url:this.baseapath+'api/classes/'+id+'?expand=category,teacher,teacherProfile',
                  success: function(response, textStatus, jqXHR){
                        var items = response;
                        _this.person=items.teacherProfile.name;
                        _this.time=_this.format(items.created_at);
                        _this.title=items.title;
                        _this.getQuestion();
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                    _this.$Message.error(jqXHR.responseJSON.message);
                    /*if(jqXHR.status == 403){
                        _this.$router.push({'path':'/login',query:{path:_this.$route.path,class_id:_this.$route.query.class_id}});
                    }*/
                  }
                });
            }
        },
        mounted:function () {
            /*this.getQuestion();*/
            this.getInfo();
            /*从路由上获取uid*/
            let uid=this.$route.query.uid;
            if(uid){
                window.localStorage.setItem('id',uid);
                this.getUserInfo(uid);
            }
        }
    }
</script>
<style scoped>
.score_info{
    padding: 0.15rem;
}

.share_score{
    margin-top: 0.1rem;
    padding-top: 0.1rem;
    border-top: 1px solid #dfdfdf;
    font-size: 0.15rem;
}

.share_score>div{
    padding-bottom: 0.1rem;
}

.share_score h3{
    color: #61b4ff;
    padding-bottom: 0.1rem;
}

.share_info{
    font-size: 0.14rem;
}

.score_btn{
    width: 100%;
    height: 0.45rem;
    text-align: center;
    margin: 0.15rem 0;
}

.share_info p{
    padding-bottom: 0.1rem;
}

.score_btn button{
    width: 2rem;
    height: 0.45rem;
    color: #fff;
    text-align: center;
    outline: none;
    line-height: 0.45rem;
    border-radius: 0.2rem;
    border:none;
    background: linear-gradient(to right, rgba(60,162,255,1),rgba(60,162,255,0.8),rgb(102,206,255), rgb(114,218,255)); 
}
.ivu-radio-wrapper{
    font-size: 0.13rem;
}
</style>