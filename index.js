(function() {

    var DEBUG = true;

    var app = angular.module('teachAssist', [
        'LocalStorageModule',
        'ngSanitize',           //必须在app定义时声明
        'ui.router',
        'oc.lazyLoad'
    ]);

    //set API baseURL
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q) {
            return {
                'request': function (config) {
                    if (DEBUG === true)
                        config.url = config.url.replace("API", "https://localhost:9999");
                    else
                        config.url = config.url.replace("API", "https://teachassist.xyz:9999");
                    console.log(config.url);
                    return config || $q.when(config);
                }
            }
        })
    });






    //add x-access-token header
    app.run(function ($http, localStorageService) {
        var users = localStorageService.get("users");
        if (users && users.token) {
            console.log("set header x-access-token: " + users.token);
            $http.defaults.headers.common["x-access-token"] = users.token;
        }
    });



    //config dependencies
    app.config(function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            modules: [
                {name:"ckeditor", files:["//cdn.bootcss.com/ckeditor/4.5.4/ckeditor.js"]},

                {name:"angular-carousel", files:["//cdn.bootcss.com/angular-carousel/1.0.1/angular-carousel.min.js"]},
                {name:"ngTouch", files:["//cdn.bootcss.com/angular-touch/1.4.8/angular-touch.min.js"]},
                {name:"ngCkeditor", files:["/bower_components/ng-ckeditor/ng-ckeditor.min.js"]},

                {name:"usericon", files:["/components/usericon/usericon.js"]},
                {name:"navbar", files:["/components/navbar/navbar.js"]},

                {name:"main", files:["/components/main/main.js"]},
                {name:"login", files:["/components/login/login.js"]},
                {name:"courses", files:["/components/courses/courses.js"]},
                {name:"self", files:["/components/self/self.js"]}
            ]
        })
    });


    //config router
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url:'/',
                templateUrl: '/components/main/main.html',
                controller: 'main',
                resolve:{
                    main: function($ocLazyLoad) {
                        return $ocLazyLoad.load(["main"])
                    }
                }
            })
            .state('login', {
                url:'/login',
                templateUrl: '/components/login/login.html',
                controller: 'login',
                resolve:{
                    login: function($ocLazyLoad) {
                        return $ocLazyLoad.load(["login"])
                    }
                }
            })
            .state('courses', {
                url:'/courses',
                templateUrl: '/components/courses/courses.html',
                controller: 'courses',
            resolve:{
                courses: function($ocLazyLoad) {
                    return $ocLazyLoad.load(['courses'])
                }
            }
            })
            .state('courses_id', {
                url:'/courses/:_id^?:param',
                templateUrl: 'components/course-main/course-main.html',
                controller: 'courseMain',
                reloadOnSearch: false,
                resolve:{
                    courseMain:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'components/course-main/course-main.js',
                            'components/navbar/navbar.js',
                            'components/usericon/usericon.js',
                            'components/course-aside/course-aside.js',
                            'components/course-intro-sched/course-intro-sched.js',
                            'components/course-teacher/course-teacher.js',
                            'components/course-students/course-students.js',
                            'components/course-ware/course-ware.js',
                            'components/homework/homework.js',
                            'components/homework-main/homework-main.js',
                            'components/post-list/post-list.js',
                            'components/post-detail/post-detail.js',
                            '/bower_components/angular-datepicker/dist/angular-datepicker.min.js',
                            '/bower_components/ng-ckeditor/ng-ckeditor.min.js'
                        ])
                    }]
                }
            })
            .state('self', {
                url:'/self',
                templateUrl: '/components/self/self.html',
                controller: 'self',
                resolve:{
                    self:['$ocLazyLoad',function($ocLazyLoad){
                        return $ocLazyLoad.load(['self'])
                    }]
                }
            });



    });



})();
