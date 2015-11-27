define(['app', 'mainService', 'utilsService', 'houseCompleteDirective', 'masklayer','temmode','desginer','zoomable', 'scrollService'], function(app) {
  app.register.controller('decorateCtrl', [
    '$scope', 
    '$timeout',
    'mainAjax', 
    'utils',
    '$templateCache',  
    '$ionicActionSheet',
    '$http',
    '$ionicLoading',
    'scroll',
    '$ionicSlideBoxDelegate',
    '$ionicScrollDelegate',
    function($scope, $timeout,mainAjax, utils, $templateCache, $ionicActionSheet,$http,$ionicLoading,$ionicSlideBoxDelegate,$ionicScrollDelegate) {
    $scope.masklayerShowHideClass="RightColumnParentclassNone";
    $scope.masklayerShowHideClass2="RightColumnParentclassNone"
    $scope.masklayerShowHideClass3="RightColumnParentclassNone"
    $scope.masklayerSignOut = "ng-enter-active";
        $scope.DynamicTem='';
        $scope.DynamicTem2='';
        $scope.DynamicTem3='';
        $scope.tpl='';
        $scope.pid = "";
        $scope.inbond = '';
        $scope.payState = '0';
        $scope.payDesginerState = '0';
        $scope.decorateInfo = {};
        $scope.decorate = {};
        $scope.stateC = $scope.state ="中标";
        $scope.isActive = true;
        $scope.itemsChecked = [];//复选框数据容器
        $scope.supervisionElem = {};
        $scope.supervisionComplete = {};
        $scope.companyModel = {};
        $scope.validateCodeShow = false;//手机号不合法时不显示输入验证码框 
        $scope.companyElem = {};
        $scope.companyElem2 = {};
        //前节点的数据模拟
        $scope.allHouseData = 'a';
        $scope.allDesginer = 'b';
        $scope.allDecorate = 'c';
        $scope.allConstructe = 'd';
        $scope.typeA = $scope.typeAC = false;
        $scope.typeB = $scope.typeBC = false;
        $scope.typeC = $scope.typeCC = false;
        $scope.typeD = $scope.typeDC = false;
        $scope.typeE = $scope.typeEC = false;
        $scope.typeF = $scope.typeFC = false;
        $scope.typeG = $scope.typeGC = true;
        $scope.typeH = $scope.typeHC = true;
        $scope.postdata = {
          HouseInfo: {
            HouseType: '',
            DecorationType: '',
            budget:'',
            units:'',
            decorateStyle:'',
            situation:'',
            house:'',
            designCost:'',
            designModes:''
          },
          DecorateInfo:{
            budget:'',
            houseSituation:'',
            contractWay:'',
            materialGrade:'',
            resource:[],
            selectMaterial:''
          },
          DecorationRequirements: {}
        };

        $scope.img =[{

        }]
        $scope.results =[
                    {"realname":"枫林华府", "position":{"lng":"108.884776", "lat":"34.253946"}},
                    {"realname":"枫叶新都市", "position":{"lng":"108.891891", "lat":"34.240697"}},
                    {"realname":"机关小区", "position":{"lng":"108.930195", "lat":"34.232938"}},
                    {"realname":"都市皇庭", "position":{"lng":"108.942483", "lat":"34.254006"}},
                    {"realname":"绿地乐和城", "position":{"lng":"108.890813", "lat":"34.26958"}},
                    {"realname":"西城坊小区", "position":{"lng":"108.932494", "lat":"34.269759"}},
                    {"realname":"天马小区", "position":{"lng":"109.030661", "lat":"34.265165"}},
                    {"realname":"东建小区", "position":{"lng":"109.033464", "lat":"34.254126"}},
                    {"realname":"雁鸣家园", "position":{"lng":"108.972523", "lat":"34.255498"}},
                    {"realname":"高新领域", "position":{"lng":"108.84482", "lat":"34.225715"}},
                    {"realname":"紫薇康馨公寓", "position":{"lng":"108.835046", "lat":"34.214193"}},
                    {"realname":"金堆城小区", "position":{"lng":"108.861564", "lat":"34.159545"}},
                    {"realname":"长安市管小区", "position":{"lng":"108.953335", "lat":"34.157514"}},
                    {"realname":"曲江香都", "position":{"lng":"108.959515", "lat":"34.209595"}},
                    {"realname":"曲江公馆", "position":{"lng":"108.939178", "lat":"34.234788"}},
                    {"realname":"八一小区", "position":{"lng":"108.934075", "lat":"34.248755"}},
                    {"realname":"兰蒂斯城", "position":{"lng":"109.000837", "lat":"34.251022"}},
                    {"realname":"万景花园", "position":{"lng":"108.910504", "lat":"34.291594"}},
                    {"realname":"永丰公寓", "position":{"lng":"34.272086", "lat":"34.272086"}},
                    {"realname":"西辛庄", "position":{"lng":"108.882836", "lat":"34.24022"}}
                    ]
        $scope.DecorationInfo=[       
          {
            Text:"设计信息",
            State:'0',
            Color:'Orange', 
            Templates:'templates/main/houseInfoTem.html',
            Tem:'templates/main/houseInfoTemw.html',
            HouseData:{
              HouseType:{
                  name:"房型",
                  Data:[{ text: "平层", value: "平层" },{ text: "跃层", value: "跃层" },{ text: "复式", value: "复式" },{ text: "别墅", value: "别墅" }],
              },
              DecorationType:{
                  name:"装修要求",
                  Data:[{ text: "婚房装修", value: "婚房装修" },{ text: "租赁简装", value: "租赁简装" },{ text: "自住装修", value: "自住装修" },{ text: "其他装修", value: "其他装修" }],
              },
              budget: {
                name: "装修预算",
                Data: [{text: "小于5万",value: "小于5万"},{text: "5-10万",value: "5-10万"}, {text: "10-20万",value: "10-20万"}, {text: "20万以上",value: "20万以上"}],
              },
              units: {
                name: "户型",
                Data: [{text: "一室一厅",value: "一室一厅"},{text: "两室一厅",value: "两室一厅"}, {text: "两室两厅",value: "两室两厅"}, {text: "三室一厅",value: "三室一厅"}, {text: "三室两厅",value: "三室两厅"}, {text: "其他",value: "其他"}]
              },
              decorateStyle: {
                name: "风格",
                Data:[{text: "欧式",value: "欧式"},{text: "美式",value: "美式"}, {text: "中式",value: "中式"}, {text: "日韩",value: "日韩"}, {text: "东南亚",value: "东南亚"}, {text: "地中海",value: "地中海"}, {text: "现代",value: "现代"}, {text: "田园",value: "田园"}, {text: "混搭",value: "混搭"}, {text: "其他",value: "其他"}]
              },
              situation: {
                name: "房屋情况",
                Data: [{text: "毛坯新房",value: "毛坯新房"},{text: "旧房翻新",value: "旧房翻新"}, {text: "局部改造",value: "局部改造"}, {text: "其他",value: "其他"}]
              },
              house : {
               name: "小区信息",
               Data: [
                      {"realname":"枫林华府", "position":{"lng":"108.884776", "lat":"34.253946"}},
                      {"realname":"枫叶新都市", "position":{"lng":"108.891891", "lat":"34.240697"}},
                      {"realname":"机关小区", "position":{"lng":"108.930195", "lat":"34.232938"}},
                      {"realname":"都市皇庭", "position":{"lng":"108.942483", "lat":"34.254006"}},
                      {"realname":"绿地乐和城", "position":{"lng":"108.890813", "lat":"34.26958"}},
                      {"realname":"西城坊小区", "position":{"lng":"108.932494", "lat":"34.269759"}},
                      {"realname":"天马小区", "position":{"lng":"109.030661", "lat":"34.265165"}},
                      {"realname":"东建小区", "position":{"lng":"109.033464", "lat":"34.254126"}},
                      {"realname":"雁鸣家园", "position":{"lng":"108.972523", "lat":"34.255498"}},
                      {"realname":"高新领域", "position":{"lng":"108.84482", "lat":"34.225715"}},
                      {"realname":"紫薇康馨公寓", "position":{"lng":"108.835046", "lat":"34.214193"}},
                      {"realname":"金堆城小区", "position":{"lng":"108.861564", "lat":"34.159545"}},
                      {"realname":"长安市管小区", "position":{"lng":"108.953335", "lat":"34.157514"}},
                      {"realname":"曲江香都", "position":{"lng":"108.959515", "lat":"34.209595"}},
                      {"realname":"曲江公馆", "position":{"lng":"108.939178", "lat":"34.234788"}},
                      {"realname":"八一小区", "position":{"lng":"108.934075", "lat":"34.248755"}},
                      {"realname":"兰蒂斯城", "position":{"lng":"109.000837", "lat":"34.251022"}},
                      {"realname":"万景花园", "position":{"lng":"108.910504", "lat":"34.291594"}},
                      {"realname":"永丰公寓", "position":{"lng":"34.272086", "lat":"34.272086"}},
                      {"realname":"西辛庄", "position":{"lng":"108.882836", "lat":"34.24022"}}
                      ]
              },
              designCost: {
                name: "设计花费",
                Data: [{text: "20",value: "20"},{text: "50",value: "50"}, {text: "100",value: "100"}, {text: "150",value: "150"}]
              },
               designModes: {
                name: "设计方式",
                Data: [{text: "免费设计",value: "免费设计"}, {text: "付费设计",value: "付费设计"}]
                } 

              }
            },
            //下标1
          {
            Text:"预约设计师",
            State:'0',
            Color:'Orange',
            Templates:'templates/main/invitDesginer.html',
            Tem:'templates/main/winEliminated.html'
          },
          
          // {
          //   Text:"设计验收",
          //   Templates:'templates/main/decorateInfoTem.html',
          //   // Tem:'templates/main/decorateInfoTemw.html'
          // },
          
          { 
           Text:"装修",
           State:'0',
           Color:'Orange',
           Templates:'templates/main/decorateInfoTem.html',
           Tem:'templates/main/decorateInfoTemw.html',
            DecorationDemand :{
            budget: {
              name: "装修预算",
              Data: [{text: "小于5万",value: "小于5万"},{text: "5-10万",value: "5-10万"}, {text: "10-20万",value: "10-20万"}, {text: "20万以上",value: "20万以上"}],
            },
            houseSituation: {
              name: "房屋情况",
              Data: [{text: "毛坯新房",value: "毛坯新房"}, {text: "旧房翻新",value: "旧房翻新"}, {text: "局部改造",value: "局部改造"}, {text: "其他",value: "其他"}]
            },
            contractWay: {
              name: "承包方式",
              Data: 
              [
                {text: "半包",value: [{text : "地板"},{text : "瓷砖"},{text : "洁具"},{text : "整体橱柜" },{text:"室内门"},{text:"壁纸"},{text:"开关插座"},{text:"石材"},{text:"衣柜"},{text : "书柜"}]},
                {text: "全包",value: [{text: "有确定的主材", value:"有确定的主材"}, {text: "没有确定的主材", value:[{text: "一线品牌"},{text: "二线品牌"},{text: "三线品牌"}]}]}
              ],
              materialGrade: "要求装修公司使用主材档次为",
              selectMaterial: "请选择您要自行购买的主材，方便装修公司为您报价,以及后续采买",
            },
            payType:{
              name: "支付方式",
              Data:[{text: "线上支付",value: "线上支付"}, {text: "线下支付",value: "线下支付"}]
            }
            }         
          },

          //3
          {
           Text:"施工",
           State:'0',
           Color:'Orange',
           Templates:'templates/main/invitCompany.html',
           // Tem:'templates/main/companyInfoTemw.html',       
          }
          ]

          $scope.invitDesginerShow = {
            Text:"预约设计师",
            State:'0',
            Color:'Orange',
            Templates:'templates/main/invitDesginer.html',
            Tem:'templates/main/winEliminated.html'
          }

          $scope.freeDesginerShow = {
            Text:"设计验收",
            State:'0',
            Color:'Orange',
            Templates:'',
            Tem:'templates/main/desginAccetance.html'
          }
          

       //state:预约状态   desginScore：评分   desginCost：设计花费  introduction：设计师介绍   hrefimg：图片链接
       // img：设计师头像  name：设计师姓名   type：设计师等级  time：设计次数   desginerId：设计师id  works：作品
      $scope.decorcompany=[
        {state:'预约量房',desginScore:'7', minCost:40,desginCost:'40-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desginercenter',img:'cache/img/000.jpg',name:'设计师A',type:"高级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"1"
          ,works:[{img:'images/biao_img01.png', id:"10", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"100", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"1000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'4', minCost:100,desginCost:'100-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/001.jpg',name:'设计师B',type:"高级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"2"
        ,works:[{img:'images/biao_img01.png', id:"20", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"200", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"2000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'6', minCost:50,desginCost:'50-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/002.jpg',name:'设计师C',type:"初级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"3"
        ,works:[{img:'images/biao_img01.png', id:"30", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"300", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"3000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'8', minCost:60,desginCost:'60-100￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/003.jpg',name:'设计师D',type:"中级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"4"
        ,works:[{img:'images/biao_img01.png', id:"40", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"400", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"4000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'9', minCost:70,desginCost:'70-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/004.jpg',name:'设计师E',type:"中级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"5"
        ,works:[{img:'images/biao_img01.png', id:"50", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"500", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"5000", title:'枫林绿洲',time:'2015-2-9'}]},      
        {state:'预约量房',desginScore:'8', minCost:80,desginCost:'80-100￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/003.jpg',name:'设计师D',type:"高级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"6"
        ,works:[{img:'images/biao_img01.png', id:"60", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"600", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"6000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'9', minCost:90,desginCost:'90-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/004.jpg',name:'设计师E',type:"初级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"7"
        ,works:[{img:'images/biao_img01.png', id:"70", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"700", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"7000", title:'枫林绿洲',time:'2015-2-9'}]}      
      ]

      //监理数据
      $scope.supervision=[
         {name:'监理A',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理B',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},        
         {name:'监理C',cost:'600',type:'高级监理',img:'images/jianli_icon4.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},      
         {name:'监理D',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理E',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理F',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理G',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理H',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}}
      ]

      //装修公司数据
      $scope.decorateCompany=[
          {name:'公司A',companyId:"1", minCost:90, desginCost:"90-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'9',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司B',companyId:"2", minCost:80, desginCost:"80-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'8',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司C',companyId:"3", minCost:40, desginCost:"40-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'7',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司D',companyId:"4", minCost:20, desginCost:"20-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'5',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司E',companyId:"5", minCost:20, desginCost:"20-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'2',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司F',companyId:"6", minCost:10, desginCost:"10-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'1',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司G',companyId:"7", minCost:70, desginCost:"70-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'0',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司H',companyId:"8", minCost:30, desginCost:"30-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'6',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司I',companyId:"9", minCost:50, desginCost:"50-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'2',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司J',companyId:"10", minCost:60, desginCost:"60-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'5',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}}
      ]

        $scope.initData = function() {
          vm.init()
          //预加载项
          $templateCache.removeAll(); //移除所有模板内容，释放内存
          $templateCache.put('templates/main/decorateChooseTem.html', utils.getTemplates('templates/main/decorateChooseTem.html')); //列表选择模板
          $templateCache.put('templates/main/houseInputTem.html', utils.getTemplates('templates/main/houseInputTem.html')); //小区自动完成模板
          $templateCache.put('templates/main/numberInputTem.html', utils.getTemplates('templates/main/numberInputTem.html')); //输入数字模板
          $templateCache.put('templates/main/descosTem.html', utils.getTemplates('templates/main/descosTem.html'));
          $templateCache.put('templates/main/descontactTem.html', utils.getTemplates('templates/main/descontactTem.html'));
          $templateCache.put('templates/main/hoseinfoTemw.html', utils.getTemplates('templates/main/hoseinfoTemw.html'));
          $templateCache.put('templates/main/houseInfoTem.html', utils.getTemplates('templates/main/houseInfoTem.html'));          
          $templateCache.put('templates/main/decorationRequirementsTem.html', utils.getTemplates('templates/main/decorationRequirementsTem.html'));
          $templateCache.put('templates/main/contactInfo.html', utils.getTemplates('templates/main/contactInfo.html'));
          $templateCache.put('templates/main/decorateRequirements.html', utils.getTemplates('templates/main/decorateRequirements.html'));
          $templateCache.put('templates/main/desginRequirements.html', utils.getTemplates('templates/main/desginRequirements.html'));
          $templateCache.put('templates/main/desginType.html', utils.getTemplates('templates/main/desginType.html'));
          $templateCache.put('templates/main/evaluationDesginer.html', utils.getTemplates('templates/main/evaluationDesginer.html'));
          $templateCache.put('templates/main/payDesginCost.html', utils.getTemplates('templates/main/payDesginCost.html'));
          $templateCache.put('templates/main/payInfo.html', utils.getTemplates('templates/main/payInfo.html'));
          $templateCache.put('templates/main/evaluationDesginer.html', utils.getTemplates('templates/main/evaluationDesginer.html'));
          $templateCache.put('templates/main/desginCenterTem.html',utils.getTemplates('templates/main/desginCenterTem.html'));
          $templateCache.put('templates/main/descosTem.html',utils.getTemplates('templates/main/descosTem.html')); 
          $templateCache.put('templates/main/desginCenterTem.html',utils.getTemplates('templates/main/desginCenterTem.html')); 
          $templateCache.put('templates/main/winEliminated.html',utils.getTemplates('templates/main/winEliminated.html')); 
          $templateCache.put('templates/main/decorateInfoTem.html',utils.getTemplates('templates/main/decorateInfoTem.html')); 
          $templateCache.put('templates/main/decorateInfoTemw.html',utils.getTemplates('templates/main/decorateInfoTemw.html')); 
          $templateCache.put('templates/main/invitSupervision.html',utils.getTemplates('templates/main/invitSupervision.html')); 
          $templateCache.put('templates/main/supervisionCenterTem.html',utils.getTemplates('templates/main/supervisionCenterTem.html')); 
          $templateCache.put('templates/main/companyCenterTem.html',utils.getTemplates('templates/main/companyCenterTem.html')); 
          $templateCache.put('templates/main/invitCompany.html',utils.getTemplates('templates/main/invitCompany.html')); 
          $templateCache.put('templates/main/companyCenterTem.html',utils.getTemplates('templates/main/companyCenterTem.html')); 
          // $templateCache.put('templates/main/companyInfoTemw.html',utils.getTemplates('templates/main/companyInfoTemw.html')); 
          $templateCache.put('templates/main/companywinEliminate.html',utils.getTemplates('templates/main/companywinEliminate.html')); 
          $templateCache.put('templates/main/imagesView.html',utils.getTemplates('templates/main/imagesView.html')); 
          $templateCache.put('templates/main/invitDesginer.html',utils.getTemplates('templates/main/invitDesginer.html')); 
          
          if (localStorage.getItem('user')) {
            $scope.userData = localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : new Object();
            if ($scope.userData != undefined && !$scope.userData.bidder) {
              $scope.userData.bidder = new Object();
            }
            $scope.$watch(function() {
              var user = JSON.parse(localStorage.getItem('user'));
              var bidder = user != undefined ? user.bidder : new Object();
              return bidder;
            }, function(newvalue, oldvalue) {
              $scope.userData.bidder = newvalue;
            }, true);
          } else {
            utils.gotoLogin();
          }
        }
      //面积格式检测   
      $scope.inputSpaceDone = function() {
        if ($scope.decorateInfo.space != undefined && $scope.decorateInfo.space.replace(/\D/g, '').trim() != '' ) {
          $scope.decorate.space = {
            val: $scope.decorateInfo.space,
            txt: $scope.decorateInfo.space + '平方米'
          }
        } else {
          utils.alert('你输入的面积不正确，请重新输入');
        }
      }
      //设计方式的显示与隐藏
      $scope.showHide = function(){
        if($scope.postdata.HouseInfo.designModes == "免费设计"){
           $scope.showType=false,
           $scope.showTypeDe=false
        }
        if($scope.postdata.HouseInfo.designModes == "付费设计"){ 
          $scope.showType=true,
          $scope.showTypeDe=true         
        }
        if($scope.postdata.DecorateInfo.contractWay == "半包"){
          $scope.postdata.DecorateInfo.selectMaterial = ''; //清空全包的缓存数据
          $scope.confirmResource = true; 
          $scope.decorateAll = true;
          $scope.decorateHalf = true;
        }
        if($scope.postdata.DecorateInfo.contractWay == "全包"){
          // $scope.itemsMark = false;
          // $scope.itemsChecked = [];
          $scope.decorateAll = false;
          $scope.decorateHalf = false;
        }
        if($scope.postdata.DecorateInfo.selectMaterial == "有确定的主材"){
          $scope.confirmResource = true; 
        }
        if($scope.postdata.DecorateInfo.selectMaterial == "没有确定的主材"){
          $scope.confirmResource = false;
        }
      }

      //复选框数据
      $scope.itemMark = function(boo, item){
        if(boo){
          $scope.itemsChecked.push(item);
        }else{
          $scope.itemsChecked.splice($scope.itemsChecked.indexOf(item), 1);
        }
          console.log($scope.itemsChecked)
      }

      $scope.masklayerClickT = function(templates) {
          $scope.masklayerSignOut = 'ng-leave-active';
          $timeout(function() {
            $scope.masklayerShowHideClass = "RightColumnParentclassNone";
            $scope.masklayerSignOut = "ng-enter-active";
          }, 500)
          $timeout(function() {
            $scope.masklayerShowHideClass = "RightColumnParentclassNotNone";
            $scope.DynamicTem = templates;
          }, 600)
      }
       $scope.masklayerClickR = function(templates){
          $scope.masklayerShowHideClass = "RightColumnParentclassNotNone"
          $scope.DynamicTem = templates;
       }

      $scope.masklayerClickA = function(templates){
          $scope.masklayerShowHideClass3 = "RightColumnParentclassNotNone"
          // $scope.DynamicTem3 = templates;
       }

     $scope.checkPhone = function(str){
      if(utils.chkMobile(str)){
          $scope.validateCodeShow = true;
      }
     }

    //发布任务，提交数据检查是否填完
    $scope.masklayerClick = function(templates) {
      if (templates == 'templates/main/decorateRequirements.html') {
        if ($scope.postdata.HouseInfo.HouseType != '' && $scope.postdata.HouseInfo.HouseType != null && $scope.postdata.HouseInfo.DecorationType != '' && $scope.postdata.HouseInfo.DecorationType != null && $scope.postdata.HouseInfo.units != '' && $scope.postdata.HouseInfo.units != null && $scope.decorateInfo.house != '' && $scope.decorateInfo.house != null && $scope.decorateInfo.space != '' && $scope.decorateInfo.space != null) {
          $scope.masklayerClickR(templates);
        } else {
          utils.alert("请完成上述信息的填写!");
        }   
      } else if (templates == 'templates/main/desginRequirements.html') {
        if ($scope.postdata.HouseInfo.decorateStyle != '' && $scope.postdata.HouseInfo.decorateStyle != null && $scope.postdata.HouseInfo.budget != '' && $scope.postdata.HouseInfo.budget != null && $scope.postdata.HouseInfo.situation != '' && $scope.postdata.HouseInfo.situation != null) {
          $scope.masklayerClickR(templates);
        } else {
          utils.alert("请完成上述信息的填写!");
        }
      } else if (templates == 'templates/main/contactInfo.html') {
        if ($scope.postdata.HouseInfo.designModes == '免费设计') {
            $scope.postdata.HouseInfo.designCost = null;
            $scope.decorate = {
               txt : $scope.postdata.HouseInfo.designCost 
            }
            $scope.masklayerClickR(templates);
        } else if ($scope.postdata.HouseInfo.designModes == '付费设计' && $scope.postdata.HouseInfo.designCost != '' && $scope.postdata.HouseInfo.designCost != null) {
          $scope.masklayerClickR(templates);
        } else {
          utils.alert("请检查信息是否填写正确!");
        }

      } else if (templates == 'templates/main/payInfo.html') {        
        console.log("fsfssf")
        if (utils.chkMobile($scope.decorateInfo.telephone) && $scope.decorateInfo.checkCode) {
          if ($scope.postdata.HouseInfo.designModes == '免费设计') {
            $scope.masklayerShowHideClass = "RightColumnParentclassNone"
            //免费设计，将预约设计师节点替换成设计验收
            $scope.DecorationInfo.splice(1, 1, $scope.freeDesginerShow);
            console.log("wafjwiofw")
            $scope.changeState(0);
            $scope.evalDesginer = '';
          } else {
            console.log("shdiwdwdwdw")
            $scope.changeState(0);
            if ($scope.DecorationInfo[1] == $scope.freeDesginerShow) {
              $scope.DecorationInfo.splice(1, 1, $scope.invitDesginerShow)
            }
            // $scope.masklayerClickR(templates);
             utils.modal(templates, $scope, 1);
          }
        } else {
          utils.alert("请检查信息是否填写正确!");
        }
      } else if (templates == 'templates/main/decorationRequirementsTem.html') {
        // if ($scope.decorateInfo.desginRequire != '' && $scope.decorateInfo.desginRequire != null) {
        //   //此处向后台提交设计要求数据
        // }
          $scope.masklayerClickR(templates);
      }else if(templates == 'invitDesginer'){
        if($scope.allHouseData == ''){
          return null;
        }else{
            if($scope.payState == '0'){
               utils.showDialog("", "请先支付保证金！", "",function(){ utils.modal('templates/main/payInfo.html', $scope,1);});
            }else{
              $scope.masklayerClickR('templates/main/invitDesginer.html');
            }
        }
      }else if(templates == 'invitCompany'){
        if($scope.allHouseData == '' || $scope.allDesginer == ''){
          return null;
        }else{
          if($scope.payDesginerState == '0'){
           utils.showDialog("", "请支付设计费", "",function(){ utils.modal('templates/main/payDesginCost.html', $scope,1);});
          }else{
            $scope.masklayerClickR('templates/main/invitCompany.html');
          }
        }
      }else{
         utils.alert("请核对信息!");
      }
    }


   //获取用户对设计者的评价,分数
   $scope.inputDesginerEval = function(_Num){
     //服务态度打分   $('#pointP1').data('obj1') 设计水平打分   $('#pointP2').data('obj2') 工作效率打分   $('#pointP3').data('obj3')
    if($scope.decorateInfo.desginerEval != null && $('#pointP1').data('obj1') != null && $('#pointP2').data('obj2') != null && $('#pointP3').data('obj3') != null){        
      // $scope.changeState(_Num)
      utils.showDialog("", "感谢你的评价！", "",function(){
        $timeout(function() {
          $scope.masklayerShowHideClass="RightColumnParentclassNone"
        }, 500)
       $timeout(function() {
          $scope.masklayerShowHideClass="RightColumnParentclassNotNone"
        }, 600)
       $timeout(function() {
          $scope.masklayerShowHideClass="RightColumnParentclassNone"
        }, 630)
      });  
    }else{
      utils.alert("请填写你对设计师的意见!");
    }
   }

    //预约监理
    $scope.supervisionReservations = function(){
      $scope.supervisionElem.state = "已邀请"; 
      //邀请设计师的头像，将显示在首页上
      $scope.supervisionComplete=$scope.supervisionElem;
      $scope.masklayerShowHideClass2 = "RightColumnParentclassNone"
    }

    //预约装修公司，进行比较中标和淘汰
    $scope.companyReservations = function(_item){ 
      if(!$scope.evalCompany){
        if(!$scope.companyElemOne){
          if(_item.state == "已预约"){
            utils.alert("您已预约当前装修公司")
          }else{ 
            $scope.companyElemOne = _item;
            $scope.typeAC = true;
            $scope.typeBC = true;
            _item.state = "已预约"; 
            $scope.masklayerShowHideClass="RightColumnParentclassNone";
            $scope.masklayerShowHideClass2="RightColumnParentclassNone";   
          }
        }else if(!$scope.companyElemTwo){
          if(_item.state == "已预约"){
            utils.alert("您已预约当前装修公司")
          }else{ 
            $scope.companyElemTwo = _item;
            $scope.typeCC=true;
            $scope.typeDC=true;
            _item.state = "已预约";
            $scope.masklayerShowHideClass="RightColumnParentclassNone";
            $scope.masklayerShowHideClass2="RightColumnParentclassNone";  
           }  
        }else if(!$scope.companyElemThree){
          if(_item.state == "已预约"){
            utils.alert("您已预约当前装修公司")
          }else{ 
           $scope.companyElemThree = _item;
           $scope.typeEC=true;
           $scope.typeFC=true;
           _item.state = "已预约";
           $scope.masklayerShowHideClass="RightColumnParentclassNone";
           $scope.masklayerShowHideClass2="RightColumnParentclassNone";  
         }
        }
        else{
          //防止页面出错
          utils.alert("您最多只能选择三个装修公司为你服务，在取消前面的装修公司后可继续选择！");
          $scope.masklayerShowHideClass="RightColumnParentclassNone";         
        }     
      }else{
          utils.alert("您已成功预约，无需进行此操作！");
      }
    }

    //预约量房,选择设计师进行比较
    $scope.roomReservations = function(obj){ 
      if(!$scope.evalDesginer){//判断如果已中标，无法进行预约
        if(!$scope.desginElemOne){
          if(obj.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
           $scope.desginElemOne = obj;
           $scope.typeA=true;
           $scope.typeB=true;
           obj.state = "已预约"; 
           $scope.masklayerShowHideClass="RightColumnParentclassNone";
           $scope.masklayerShowHideClass2="RightColumnParentclassNone";    
          }
        }else if(!$scope.desginElemTwo){
          if(obj.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
           $scope.desginElemTwo = obj;
           $scope.typeC=true;
           $scope.typeD=true;
           obj.state = "已预约";
           $scope.masklayerShowHideClass="RightColumnParentclassNone";
           $scope.masklayerShowHideClass2="RightColumnParentclassNone";  
          }
        }else if(!$scope.desginElemThree){
          if(obj.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
           $scope.desginElemThree = obj;
           $scope.typeE=true;
           $scope.typeF=true;
           obj.state = "已预约";
           $scope.masklayerShowHideClass="RightColumnParentclassNone";
           $scope.masklayerShowHideClass2="RightColumnParentclassNone";   
          }
        }else{
          utils.alert("您最多只能邀请三家公司为你服务，在取消前面的公司后可继续选择！");
          $scope.masklayerShowHideClass="RightColumnParentclassNone";
        }
      }else{
          utils.alert("您已成功预约，无需进行此操作！");
      }
    }

     //打开支付设计费model
    $scope.desginCost = function(_id){
      if(_id==$scope.desginElemOne){
        $scope.desginElemThree = $scope.desginElemTwo = '';
        $scope.typeE = $scope.typeC = false
        $scope.typeF=  $scope.typeD = true;
      }else if(_id==$scope.desginElemTwo){
        $scope.desginElemThree = $scope.desginElemOne = '';
        $scope.typeE = $scope.typeA = false;
        $scope.typeF = $scope.typeB = true;
      }else if(_id==$scope.desginElemThree){
        $scope.desginElemTwo = $scope.desginElemOne = '';
        $scope.typeC = $scope.typeA = false;
        $scope.typeD = $scope.typeB = true;
      }else{
        //防止页面出错
        $scope.masklayerShowHideClass="RightColumnParentclassNone";
      }  
        $scope.state = "支付设计费"
        $scope.evalDesginer = _id;
        $scope.DecorationInfo.splice(1, 1, $scope.freeDesginerShow)    
        $scope.masklayerShowHideClass = "RightColumnParentclassNone"
        // $scope.changeState(1);
      utils.modal('templates/main/payDesginCost.html', $scope, 1);
    }

    //从地图上预约的设计师和装修公司
     var MDesginer = localStorage.getItem('MDesginer') != 'undefined' ? JSON.parse(localStorage.getItem('MDesginer')) : new Object();
    var MCompany = localStorage.getItem('MCompany') != 'undefined' ? JSON.parse(localStorage.getItem('MCompany')) : new Object();
    // console.log(MCompany)
    // console.log(MDesginer)


    //设计师部分
    var xd = null;
    for (xd in MDesginer) {
       xd = ++xd;
       // console.log(xd)
    }
    if (xd <= 1 && (MDesginer != null || MDesginer != undefined)) {
      $scope.typeB = true;
      $scope.typeA = true;
      $scope.desginElemOne = MDesginer[0];
      console.log($scope.desginElemOne)
      // console.log("111111111")
    } else if (xd <= 2 && (MDesginer != null || MDesginer != undefined)) {
      $scope.typeB = $scope.typeD = true;
      $scope.typeA = $scope.typeC = true;
      $scope.desginElemOne = MDesginer[0];
      $scope.desginElemTwo = MDesginer[1];
      // console.log("2222222222")
    } else if(xd <= 3 && (MDesginer != null || MDesginer != undefined)){
      $scope.typeB = $scope.typeD = $scope.typeF = true;
      $scope.typeA = $scope.typeC = $scope.typeE = true;
      $scope.desginElemOne = MDesginer[0];
      $scope.desginElemTwo = MDesginer[1];
      $scope.desginElemThree = MDesginer[2];
    }else{
        $scope.typeB = $scope.typeD = $scope.typeF = false;
        // console.log("33333333")
    }
    $scope.clearCache = function() {
      $templateCache.removeAll(); //移除所有模板内容，释放内存
      // console.log("成功")
    }

    //装修公司部分
    var md = null;
    for (md in MCompany) {
       md = ++md;
       // console.log(md)
    }
    if (md <= 1 && (MCompany != null || MCompany != undefined)) {
      $scope.typeBC = true;
      $scope.typeAC = true;
      $scope.companyElemOne = MCompany[0];
      // console.log($scope.desginElemOne)
    } else if (md <= 2 && (MCompany != null || MCompany != undefined)) {
      $scope.typeBC = $scope.typeDC = true;
      $scope.typeAC = $scope.typeCC = true;
      $scope.companyElemOne = MCompany[0];
      $scope.companyElemTwo = MCompany[1];
    } else if(md <= 3 && (MCompany != null || MCompany != undefined)){
      $scope.typeBC = $scope.typeDC= $scope.typeFC = true;
      $scope.typeAC = $scope.typeCC = $scope.typeEC = true;
      $scope.companyElemOne = MCompany[0];
      $scope.companyElemTwo = MCompany[1];
      $scope.companyElemThree = MCompany[2];
    }else{
       $scope.typeAC = $scope.typeCC = $scope.typeEC = false;
    }

    //淘汰+中标
     $scope.select = function(str,id){
      if(str == '中标'){
          //判断上个节点是否完成数据的填写
          if($scope.allHouseData == ''){
            return null;
          }else{
            if($scope.payState == '0'){
                utils.showDialog("", "请支付保证金后再邀请设计师", "",function(){ utils.modal('templates/main/payInfo.html', $scope,1);});
            }else{         
             utils.showDialog("", "中标后不能修改", "",function(){ $scope.desginCost(id);
              // 我的顾问获取装修设计师名称
              localStorage.setItem("designer", id.name);
              console.log(id.name);
            });
            }
          }
      }
      if(str == '淘汰'){
        if($scope.allHouseData == ''){
            return null;
        }else{
          if($scope.payState == '0'){
              utils.showDialog("", "请支付保证金后再邀请设计师", "",function(){ utils.modal('templates/main/payInfo.html', $scope,1);});
          }else{         
           if($scope.evalDesginer == id){
             utils.alert("不可淘汰已中标师傅")
            }else if(id == $scope.desginElemOne){
              id.state = '预约量房'
              $scope.desginElemOne = '';  //清空$scope.desginElemOne对象，注意不是传进来的id对象，(他两只是在此处相等)此处对全局作用
              $scope.typeA = $scope.typeB=false;
            }else if(id == $scope.desginElemTwo){
              id.state = '预约量房'
              $scope.desginElemTwo = '';
              $scope.typeC = $scope.typeD = false;
            }else{
              id.state = '预约量房'
              $scope.desginElemThree = '';
              $scope.typeE = $scope.typeF = false;
            }
          }
        }
      }
       if(str == '中标公司'){
         utils.showDialog("", "中标后不可更改，确认继续", "",function(){$scope.companySure(id);});
      }else if(str == '淘汰公司'){
        if($scope.allHouseData == '' || $scope.allDesginer == ''){
          return null;
      }else{
          if($scope.payDesginerState == '0'){
             utils.showDialog("", "请支付设计费", "",function(){ utils.modal('templates/main/payDesginCost.html', $scope,1);});
          }else{
            if($scope.evalCompany == id){ 
               return null;
            }else{
              if(id == $scope.companyElemOne){
                id.state = '预约装修'
                $scope.companyElemOne = '';
                $scope.typeAC = $scope.typeBC = false;
              }else if(id == $scope.companyElemTwo){
                id.state = '预约装修'
                $scope.companyElemTwo = '';
                $scope.typeCC = $scope.typeDC = false;
              }else if(id == $scope.companyElemThree){
                id.state = '预约装修'
                $scope.companyElemThree = '';
                $scope.typeEC = $scope.typeFC = false;
              }else{
                return null;
              }
            }
          }
        }
     }
    }
    
    //装修公司的确定
    $scope.companySure = function(_id){
        // 我的顾问获取装修公司名称
        localStorage.setItem("designconstruction", _id.name);
        console.log(_id.name);

       if($scope.allHouseData == '' || $scope.allDesginer == ''){
        return null;
      }else{
        if($scope.payDesginerState == '0'){
           utils.showDialog("", "请支付设计费", "",function(){ utils.modal('templates/main/payDesginCost.html', $scope,1);});
        }else{
          if(_id == $scope.companyElemOne){
          utils.showDialog("", "中标后不能修改", "",function(){ 
            $scope.evalCompany = _id;
            // $scope.stateC = "已中标"
            $scope.companyElem.state = "预约装修"; 
            $scope.companyElemTwo = $scope.companyElemThree = '';
            $scope.typeEC = $scope.typeCC = false;
            $scope.typeFC = $scope.typeDC = true;        
            $scope.masklayerShowHideClass = "RightColumnParentclassNone";
            $scope.changeState(2); 
          });     
        }else if(_id == $scope.companyElemTwo){
          utils.showDialog("", "中标后不能修改", "",function(){ 
            $scope.evalCompany = _id;
            // $scope.stateC = "已中标"
            $scope.companyElem.state = "预约装修"; 
            $scope.companyElemOne = $scope.companyElemThree = '';
            $scope.typeEC = $scope.typeAC = false;
            $scope.typeFC = $scope.typeBC = true;        
            $scope.masklayerShowHideClass = "RightColumnParentclassNone";
            $scope.changeState(2); 
          });
        }else if(_id == $scope.companyElemThree){
          utils.showDialog("", "中标后不能修改", "",function(){ 
            $scope.evalCompany = _id;
            // $scope.stateC = "已   中标"
            $scope.companyElem.state = "预约装修"; 
            $scope.companyElemTwo = $scope.companyElemOne = ''; 
            $scope.typeCC = $scope.typeAC = false;
            $scope.typeDC = $scope.typeBC = true;          
            $scope.masklayerShowHideClass = "RightColumnParentclassNone";
            $scope.changeState(2); 
            }); 
        }else{
            //防止页面出错
            $scope.masklayerShowHideClass="RightColumnParentclassNotNone";
            $scope.DynamicTem='templates/main/companywinEliminate.html';  
         } 
        }
      }
    } 

    //图片预览方法
    
    //图片预览
    $scope.iconInfo = function(obj){
      console.log("dgsdg")
      if(obj = 'desgin'){
       if($scope.allHouseData == ''){
         return null;
       }else{
           if($scope.payState == '0'){
                utils.showDialog("", "请支付保证金", "",function(){ utils.modal('templates/main/payInfo.html', $scope,1);});
            }else{         
                $scope.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
                $scope.DynamicTem2 = "templates/main/desginCenterTem.html";
                $scope.desginElem = obj;
            }
       }
      }else{
        if($scope.allHouseData == '' || $scope.allDesginer == ''){
         return null;
       }else{
           if($scope.payState == '0'){
                utils.showDialog("", "请支付设计费", "",function(){ utils.modal('templates/main/payDesginCost.html', $scope,1);});
            }else{         
                $scope.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
                $scope.DynamicTem2 = "templates/main/desginCenterTem.html";
                $scope.desginElem = obj;
            }
        }
      }
    }
    
    //点击作品预览大图
    $scope.imagesView = function(obj, str){
      if(str == '设计师页面'){
        if($scope.allHouseData == ''){
          return null;
        }else{
            if($scope.payState == '0'){
                utils.showDialog("", "请支付保证金", "",function(){ utils.modal('templates/main/payInfo.html', $scope,1);});
            }else{         
                $scope.DynamicTem2 = "templates/main/imagesView.html";
                $scope.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
                $scope.imageInfo = obj;
            }
        }
      }
      if(str == '装修公司页面'){
        if($scope.allHouseData != '' && $scope.inbond != ''){
          $scope.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
          $scope.DynamicTem2 = "templates/main/imagesView.html";
          $scope.imageInfo = obj;  
        }else{
            utils.showDialog("", "请填写完设计相关信息");
          }

      }
    }

    
    //保存图片
    $scope.savePhoto = function(){
      //自定义按钮
      var btnArray = [
        {txt: '保存到本地', clickFunc: save},
        {txt: '分享到...', clickFunc: shareTo},
      ]

      var btnWarning = {
        txt: '返回',
        clickFunc: warningFunc
      }
      utils.bottomPopMenu('', btnArray, btnWarning, '取消');
    }

    function save(){      
      console.log("save")
    }
    function shareTo(){
      console.log("shareTo")
    }

    //控制节点css样式
    var element = $scope.DecorationInfo;
    for (var x in element){
       if(element[x].state == "1"){
          $scope.DecorationInfo[x].Color ="Grey";
          // console.log(element[x].Text+"任务已经完成，只可以查看不能修改")
       }

    }

   //任务发布完成后出发该事件进行任务的锁定（只能查看信息，不能进行修改）
    $scope.changeState = function(_Num){
       if($scope.postdata.HouseInfo.designModes == '免费设计'){
           $scope.DecorationInfo[_Num].State = $scope.DecorationInfo[_Num+1].State = "1";
           $scope.DecorationInfo[_Num].Color = $scope.DecorationInfo[_Num+1].Color ="Grey"; 
       }else{
          $scope.DecorationInfo[_Num].State = "1";
          $scope.DecorationInfo[_Num].Color = "Grey";
          $scope.clickif($scope.DecorationInfo,"")
       }

    }
    //支付保证金验收
    $scope.surePrice = function(data){
      // console.log($scope.inbond)
      //对设计信息进行检验是否填写完整，再次检验保证金是否支付
      if($scope.allHouseData != ''){
       if($scope.postdata.HouseInfo.designModes == "付费设计" && ($scope.inbond == '' || $scope.inbond == null)){
            utils.showDialog("", "请先支付保证金！", "",function(){ utils.modal('templates/main/payInfo.html', $scope,1);});
            console.log("11111111")
          }else if($scope.postdata.HouseInfo.designModes == "免费设计"){
            $scope.masklayerClickT(data.Templates);
            console.log("2222222222")
          }else if($scope.postdata.HouseInfo.designModes == "付费设计" && ($scope.inbond != '' || $scope.inbond != null)){
            $scope.masklayerClickT(data.Templates);
            console.log("333333333")
          }else{
              utils.showDialog("", "请先支付保证金！", "",function(){ utils.modal('templates/main/payInfo.html', $scope,1);});
              console.log("444444")
          }
      }else{
          utils.showDialog("", "请填写完设计相关信息");
      }
    }

    //支付设计费验收 
    $scope.desCost = function(data){
       if(cost == '' || cost == null){
            utils.showDialog("", "请先设计费", "",function(){ utils.modal('templates/main/payDesginerCost.html', $scope,1);});
          }else{
              $scope.masklayerClickT(data.Templates);
          }
    }

    //预约设计师节点
    $scope.Desginer = function(data){
      if($scope.allHouseData == ''){
        return null;
      }else{
         $scope.surePrice(data);
      }
    }

    //装修节点
    $scope.Decorate = function(data){
      if($scope.allHouseData == '' || $scope.allDesginer == ''){
        return null;
      }else{
        if($scope.payDesginerState == '0'){
           utils.showDialog("", "请支付设计费", "",function(){ utils.modal('templates/main/payDesginCost.html', $scope,1);});
        }
      }
    } 

    //施工节点
    $scope.Constructe = function(data){
      if($scope.allHouseData == '' || $scope.allDesginer == '' || $scope.Decorate == ''){
        return null;
      }else{
         utils.showDialog("", "装修信息完成", "");
      }
    }

    //进行前节点数据的判断,将前面的数据和费用进行判断
    $scope.clickif = function($event, data) {
      // var data = _data;
      // console.log(data)
      if (data.State == "1") {
        $event.preventDefault();
      }else if(data.Text == '预约设计师'){
        $scope.Desginer(data);
      }else if(data.Text == '装修'){
        $scope.Decorate(data);
      }else if(data.Text == '施工'){
         $scope.Constructe(data);
      }else {
        if (data.Templates != undefined) {
          $scope.masklayerClickT(data.Templates);
        }else{
          return null;
        }
      }
    }
      //筛选显示
    $scope.choice = function(str){ 
      if(str == '初级设计师' || str == '中级设计师' || str == '高级设计师'){
        $scope.type = 'type';
        $scope.search = str;
      }else if(str == '设计师评分'){
        $scope.search = ''; 
        $scope.expression = '-desginScore'; 
      }else if(str == '设计师价格'){
        $scope.price();
      }else if(str == '设计师热门'){ 
        $scope.type = 'type';
        $scope.search = '';
      }else if(str == '初级监理' || str == '中级监理' || str == '高级监理'){
        $scope.type = 'type';
        $scope.search = str;
      }else if(str == '监理评分'){
        $scope.type = 'desginScore';
        $scope.search = '';
        $scope.expression = '-desginScore';
      }else if(str == '监理价格'){ 
        $scope.price();
      }else if(str == '监理热门'){ 
        $scope.type = 'desginCost';
        $scope.search = '';
      }else if(str == '公司评分'){
        $scope.type = 'desginScore';
        $scope.search = '';
        $scope.expression = '-desginScore'
      }else if(str == '公司价格'){
        $scope.price();
      }else if(str == '公司热门'){
        $scope.type = 'desginCost';
        $scope.search = '';
      }else{

      }
    }

    var val = true; 
    $scope.price = function(){
      if(val){
       $scope.search = '';
       $scope.expression = '-minCost'; 
       val = !val;
      }else{
        $scope.search = '';
        $scope.expression = '+minCost';
        val = !val;  
      }
    }





    //打开设计师modal    
    $scope.desginer_list = function(){
       utils.modal('templates/main/invitDesginer.html', $scope,1)
       $scope.modal.remove();
    }
    //打开设计师详细信息modal 
    $scope.desginer_info = function(){
       utils.modal('templates/main/desginCenterTem.html', $scope,1)
       $scope.modal.remove();
    }

    
      /*moredata 界面上ng-if的判断 ，false为禁止 ；
      messages：将查询到的结果存放的到数组中
      perpage、currentPage分别是当前页面 和该页面的初始话加载的数据(此处是将查询的参数进行后台的传递)
      */
    var vm = $scope.vm = {
      moredata: false,
      messages: [],
      pagination: {
        perPage: 1,
        currentPage: 3
      },
       
      init: function () {
        // console.log("初始数据")
        mainAjax.getMessagesData(vm.pagination.perPage,vm.pagination.currentPage,$scope.messagessuccessFunction,$scope.messageserrorFunction)       
        /*services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
          vm.messages = data;
        })*/
      },
      show: function (message) {
        if (message.static) {
          message.static = false;
        } else {
          message.static = true;
        }
        $timeout(function() {
          $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
      },
      loadMore: function () {
          vm.pagination.currentPage += 3;
          console.log("加载更多数据",vm.pagination.perPage,vm.pagination.currentPage)
          mainAjax.getMessagesData(vm.pagination.perPage,vm.pagination.currentPage,$scope.messagessuccessFunction,$scope.messageserrorFunction);
          /*services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
            vm.messages = vm.messages.concat(data);
            if (data.length == 0) {
              vm.moredata = true;
            };            
          })*/
       
        }
    }

    $scope.messagessuccessFunction = function(response){  
      vm.messages = vm.messages.concat(response);
        if (response.length == 0) {
          vm.moredata = true;
        };
        // $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    $scope.messageserrorFunction=function(response){
      console.log("messageserrorFunction")
    }

    //关闭模板 D:设计师页面  C装修公司页面
    $scope.closeTemplate00000000000000 = function(obj){
      if(obj.mark == 'D'){
        $scope.masklayerShowHideClass2="RightColumnParentclassNone";
        
      }
      if(obj.mark == 'C'){
        $scope.masklayerShowHideClass3="RightColumnParentclassNone";
      }else {
        $scope.masklayerShowHideClass2="RightColumnParentclassNone";
      }
    }


     //关闭模板
    $scope.closeTemplate = function(){
      $scope.masklayerShowHideClass2="RightColumnParentclassNone";
    }
    $scope.closeTemplate3 = function(){
      $scope.masklayerShowHideClass3="RightColumnParentclassNone";
    }

    $scope.closeTemplateA = function(){
      $scope.masklayerShowHideClass3="RightColumnParentclassNone";
    }
    //打开设计比稿model
    $scope.winningEliminated = function(){
      utils.modal('templates/main/winEliminated.html', $scope,1);
    } 
    //打开选择modal
    $scope.chooseModal = function() {
      utils.modal('templates/main/decorateChooseTem.html', $scope, 1);
    }
    //打开小区modal（自动完成小区数据）
    $scope.houseModal = function() {
      utils.modal('templates/main/houseInputTem.html', $scope);
    }
/*    $scope.houseName = '';
    //清空输入
    $scope.clearInput = function() {
      $scope.houseName = '';
      console.log("dsgsd")
    }*/
    //打开modal
    $scope.clickcontact = function() {
      utils.modal('templates/main/descontactTem.html', $scope,1);
    }
    //打开监理详细modal
    $scope.supervisionModel = function(){
      if($scope.supervisionComplete.name== null){
        utils.alert("你还未邀请监理！");
      }else{
        console.log("测试")
          $scope.masklayerShowHideClass2="RightColumnParentclassNotNone";
          $scope.DynamicTem2='templates/main/supervisionCenterTem.html';
     }
    }

    //打开装修公司详细modal
    $scope.companyModel = function(){
      if($scope.evalCopmany == null){
        utils.alert("你还未邀请过装修公司！");
        console.log($scope.evalCopmany)
      }else{
       utils.modal('templates/main/companyCenterTem.html', $scope,1);
     }
    }
    //设计保证金的金额
    $scope.bond = {
      price: "500"
    };
    //支付保证金
    $scope.paybond = function(){
       // console.log($scope.DecorationInfo)
       utils.showDialog("", "支付成功！", "",function(){ 
           $scope.masklayerShowHideClass="RightColumnParentclassNotNone";
           $scope.DynamicTem='templates/main/invitDesginer.html'; 
           $scope.inbond=$scope.bond.price;
           $scope.payState = '1';
           // $scope.changeState(0);
           $scope.modal.remove();
       });
    }
    //移除Modal
    $scope.closeModal = function(){
      $scope.modal.remove(); 
    }
    /*******上传图片部分*******/
    //拍照按钮事件
    function takePhotoFunc(){
      console.log('拍照上传');
    }
    //相册选择事件
    function localChooseFunc(){
      console.log('在相册中选择');
    }
    //警告按钮事件
    function warningFunc(){
      console.log('警告按钮被点击');  
    }
    //添加图片
    $scope.modifyPhoto = function(){
      //自定义按钮
      var btnArray = [
        {txt: '拍照', clickFunc: takePhotoFunc},
        {txt: '在相册中选择', clickFunc: localChooseFunc},
      ]
      //警告按钮和事件
      var btnWarning = {
        txt: '删除',
        clickFunc: warningFunc
      }
      utils.bottomPopMenu('', btnArray, btnWarning, '取消');
    }
    //弹出提交信息modal
    $scope.supervisionInfo = function(){
         utils.alert("提交成功！");     
/*      if($scope.supervisionComplete.name== null){
        utils.alert("请完善上述信息后在提交！");
      }else{
       utils.modal('templates/main/paySup.html', $scope,1);
     }*/
    }
    //打开设计师详细model
    $scope.desginerModel = function(){
       utils.modal('templates/main/desginCenterTem.html', $scope,1);
    }
    //打开支付保证金界面model
    $scope.payModel = function(){
      utils.modal('templates/main/payInfo.html', $scope,1);
    }
    //弹出支付设计费模板
    $scope.desginerTem  = function(){
      $scope.modal.remove();
      if($scope.payDesginerState == '0'){
        $scope.masklayerShowHideClass="RightColumnParentclassNone";
      }
      else{
        $scope.masklayerShowHideClass="RightColumnParentclassNotNone";
      }
        $scope.DynamicTem='templates/main/searchalertViews.html';  
        $scope.payDesginerState = '1';
        $scope.changeState(1);

    }
    //修改用户信息
    $scope.modifyUser = function() {
      //修改成功，存入缓存
      localStorage.setItem('user', JSON.stringify($scope.userData));
    }
    $scope.clickcost = function() {
      utils.modal('templates/main/descosTem.html');
      $scope.userData = JSON.parse(localStorage.getItem('user', 'rooms', 'units', 'situation', 'monitor', 'house', 'designer', 'designCost', 'decorateTypes', 'decorateStyle'));
    }
    }])

  app.register.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items',
    function($scope, $modalInstance, items) {
      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function() {
        console.log($modalInstance);
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);
})