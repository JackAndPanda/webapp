define(['angularAMD','ngCordova','angular-block-ui','angular-response-lag', 'ng-baidu-map', 'angular-filter', 'jquery','bootstrap-ui','Scroller', 'Animate'], function (angularAMD) {
  var app = angular.module("app", ['ui.router','angular.filter', 'ngCordova','ionic','blockUI','responseLag', 'ngBaiduMap', 'ui.bootstrap']);



  app.factory('websocketer', function(){
    // ws = new WebSocket("ws://192.168.184:8089/chatroom"); // 应该改为动态获取服务器的ip和端口号192.168.1.184
    ws = new WebSocket("ws://192.168.1.184:8089/chatroom");
    ws.onopen = function(event) {
      console.log("连接服务器");
    };
    return ws
  })


  app.config(['blockUIConfig','responseLagConfig',function(blockUIConfig,responseLagConfig) {
    blockUIConfig.message = 'loading.....';
    blockUIConfig.delay = 100;
    blockUIConfig.template = '<div class="block-ui-overlay"></div>'
                           + '<div class="block-ui-message-container" aria-live="assertive" aria-atomic="true">'
                           + '<div class="block-ui-message ng-binding" ng-class="$_blockUiMessageClass">{{state.message}}</div>'
                           + '</div>';
    responseLagConfig.enabled = true;
    responseLagConfig.timeout.min = 750;
    responseLagConfig.timeout.max = 2500;
    responseLagConfig.excludes.push(/.*\.md/i);
  }])
  app.config(function(baiduMapApiProvider){
      baiduMapApiProvider.version('2.0').accessKey('QIzfdxxpMLDHGnqFKtTHXkCU');
  });

  app.config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
         .state('index', angularAMD.route({
            url: "/",
            templateUrl:  G.path.templates+"/indexTem.html",
          }))
          /*.state('PageTab', angularAMD.route({
            url: "/PageTab",
            abstract: true,
            controller: 'TabCtrl',
            templateUrl:  G.path.templates+"/tabsTem.html",
            controllerUrl: G.path.controllers+'/main/tabControllers.js',
          }))*/
          .state('page', angularAMD.route({
            url: "/:section/:tree",
            views: {
              "": {
                /*controller: 'HomeCtrl',
                templateUrl: G.path.templates+"/homeTem.html",
                controllerUrl: G.path.controllers+'/main/mainControllers.js'*/
                templateUrl: function (rp) {return G.path.views+"/"+rp.section+"/"+rp.tree+"Views.html";  },
                resolve: {
                  load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
                    var path = $location.path();
                    var parsePath = path.split("/");
                    var parentPath = parsePath[1];
                    var controllerName = parsePath[2];
                    // console.log(parentPath,controllerName)
                    var loadController =  G.path.controllers+'/'+parentPath+'/'+controllerName+'Controllers.js';                 

                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                  }]
                }
              }
            }
          }))
          
           $urlRouterProvider.otherwise("/");
          //console.log(G.path.controllers)
  })
  app.run(function(blockUI,$http){
    // blockUI.start();  
    // setTimeout(function () {
    //   $http({ method: 'JSONP', url: 'http://passport.zsj.test/Auth/sso_info/format/jsonp',params:{callback:'JSON_CALLBACK'} }).success(function (response, status, headers, config) {
    //       blockUI.stop();
    //       localStorage['sso_sid'] = response.sso_sid;
    //       //应用ID及域名设置
    //       localStorage['client_id'] = '13';
    //       localStorage['token'] = 'mobileyjz001';
    //   }).error(function (response) {
    //       console.log(response);
    //   });
    // }, 1000);
  });

  var indexController = function ($scope, $http,$templateCache,$location,$rootScope,blockUI){
     // console.log($location)

    $scope.$on('$stateChangeStart', function (scope, next, current) {
      //console.log("$stateChangeStart")
     
      var path = next.url;
      var parsePath = path.split("/");
      var parentPath = parsePath[1];

      if(current.section =="accounts" && current.tree != "login"){ //只限制点击‘个人中心’时验证登录
        $scope.checkLogin();
      }
    });
    $scope.$on('$stateChangeSuccess', function (scope, next, current) {

      //console.log("$stateChangeSuccess",next)
      
    });


    $scope.initializeController = function(){
      /*$http.get('templates/tabsTem.html', {  
        cache : $templateCache  
      });
      $http.get('templates/homeTem.html', {  
        cache : $templateCache  
      });
       $http.get('templates/mylongform.html', {  
        cache : $templateCache  
      });*/  
    }

    //登录检测
    $scope.checkLogin=function(){
      blockUI.start();

      var userCache = localStorage['userCache']==undefined ? '' : JSON.parse(localStorage['userCache']);
      $scope.userinfo={
        user_name : userCache.user_name==undefined ? '' : userCache.user_name,
        password : userCache.password==undefined ? '' : userCache.password,
      }
      try{
        $scope.userinfo.client_id = localStorage['client_id'];
        $scope.userinfo.token = localStorage['token'];
        $scope.userinfo.sso_sid = localStorage['sso_sid'];
      } catch(err) {
        console.log('loginClick: ' + err);
      }
      if($scope.userinfo.user_name.trim() == '' || $scope.userinfo.password.trim() == ''){
        $scope.loginErrorFunction();
        blockUI.stop();
        return;
      } else {
        var client = new HproseHttpClient("http://passport.zsj.test/Open/",["user_login"]);
        client.user_login( $scope.userinfo, function(result) {
          blockUI.stop();
          if(result.code==200){ //验证成功
            if(result.data.group_id == '1') {  //业主角色
              window.location.href = '#/accounts/index';
            } else if(result.data.group_id == '5') { //监理角色
              window.location.href = '#/monitor/index';
            }
          } else {  //验证失败
            window.location.href = "#/accounts/login"; 
          }
        },function(name,err) {
          console.log(name + ' : ' + err);
        });
      }
    } 

  }
  
  

  indexController.$inject = ['$scope', '$http','$templateCache','$location','$rootScope','blockUI'];
    app.controller("indexController", indexController);

    angularAMD.bootstrap(app);



 // console.log(app)
  return app
})