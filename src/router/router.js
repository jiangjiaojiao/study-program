import Vue from 'vue'
import Router from 'vue-router'
import login from '../login'
import index from '../components/index/index'
import study from '../components/index/study'
import finished from '../components/study/finished'
import plan from '../components/study/plan'
import mine from '../components/index/mine'
import knowledge from '../components/knowledge/knowledge'
import searchWord from '../components/knowledge/searchWord'
import searchResult from '../components/knowledge/searchResult'
import more from '../components/knowledge/more'
import detail from '../components/knowledge/detail'
import poster from '../components/knowledge/poster'
import repair from '../components/mine/repair'
import suggestion from '../components/mine/suggestion'
import appraise from '../components/mine/appraise'
import work from '../components/mine/work'
import getScore from '../components/mine/getScore'
import rank from '../components/mine/rank'
import log from '../components/mine/log'
import sign from '../components/sign/sign'
import selfCenter from '../components/sign/selfCenter'
import tabMenu from '../components/sign/tabMenu'
import scoreStudent from '../components/score/scoreStudent'
import thank from '../components/score/thank'

const routers = [
    {
        path: '/login',
        name:'login',
        meta: {
            title: 'login'
        },
        component: login
    },
    {
        path: '/',
        name:'index',
        meta: {
            title: 'index'
        },
        component: index,
        children:[
          {
              path: '',
              name:'knowledge',
              meta: {
                  title: '知识库'
              },
              component: knowledge
          },
          {
              path: '/study',
              name:'study',
              meta: {
                  title: '学习'
              },
              component: study
          },
          {
              path: '/mine',
              name:'/mine',
              meta: {
                  title: '我的'
              },
              component: mine
          }
        ]
    },
    {
        path: '/knowledge',
        name:'knowledge',
        meta: {
            title: '知识库'
        },
        component: knowledge
    },
    {
              path: '/searchWord',
              name:'searchWord',
              meta: {
                  title: '搜索'
              },
              component: searchWord
    },
    {
              path: '/searchResult',
              name:'searchResult',
              meta: {
                  title: '搜索结果'
              },
              component: searchResult
    },
    {
              path: '/more',
              name:'more',
              meta: {
                  title: '更多'
              },
              component: more
    },
    {
              path: '/detail',
              name:'detail',
              meta: {
                  title: '课程详情'
              },
              component: detail
    },
    {
              path: '/poster',
              name:'poster',
              meta: {
                  title: '课程海报'
              },
              component: poster
    },
    {
              path: '/repair',
              name:'repair',
              meta: {
                  title: '已修课程'
              },
              component: repair
    },
    {
              path: '/suggestion',
              name:'suggestion',
              meta: {
                  title: '意见反馈'
              },
              component: suggestion
    },
    {
              path: '/appraise',
              name:'appraise',
              meta: {
                  title: '我的评价'
              },
              component: appraise
    },
    {
              path: '/work',
              name:'work',
              meta: {
                  title: '我的作业'
              },
              component: work
    },
    {
              path: '/getScore',
              name:'getScore',
              meta: {
                  title: '已得学分'
              },
              component: getScore
    },
    {
              path: '/rank',
              name:'rank',
              meta: {
                  title: '排行榜'
              },
              component: rank
    },
    {
              path: '/log',
              name:'log',
              meta: {
                  title: '评分日志'
              },
              component: log
    },
    {
        path: '/tabMenu',
        name:'tabMenu',
        meta: {
            title: 'tabMenu'
        },
        component: tabMenu,
        children:[
          {
              path: '',
              name:'sign',
              meta: {
                  title: '课程签到'
              },
              component: sign
          },{
              path: '/selfCenter',
              name:'selfCenter',
              meta: {
                  title: '个人中心'
              },
              component: selfCenter
          }
        ]
    },
    {
        path: '/scoreStudent',
        name:'scoreStudent',
        meta: {
            title: '评分'
        },
        component: scoreStudent
    },
    {
        path: '/thank',
        name:'thank',
        meta: {
            title: '谢谢您的评价'
        },
        component: thank
    }
];
export default routers;
