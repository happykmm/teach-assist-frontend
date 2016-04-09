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
            modules: [{
                name:"ckeditor", 
                files:["//cdn.bootcss.com/ckeditor/4.5.4/ckeditor.js"]
            },{
                name:"angular-carousel", 
                files:["//cdn.bootcss.com/angular-carousel/1.0.1/angular-carousel.min.js"]
            },{
                name:"ngTouch", 
                files:["//cdn.bootcss.com/angular-touch/1.4.8/angular-touch.min.js"]
            },{
                name:"ngCkeditor", 
                files:["/bower_components/ng-ckeditor/ng-ckeditor.min.js"]
            },{
                name:"usericon", 
                files:["/components/usericon/usericon.js"]
            },{
                name:"navbar", 
                files:["/components/navbar/navbar.js"]
            },{
                name:"main", 
                files:["/components/main/main.js"]
            },{
                name:"login", 
                files:["/components/login/login.js"]
            },{
                name:"courses", 
                files:["/components/courses/courses.js"]
            },{
                name:"courseMain", 
                files:["/components/course-main/course-main.js"]
            },{
                name:"courseAside", 
                files:["/components/course-aside/course-aside.js"]
            },{
                name:"courseIntroSched", 
                files:["/components/course-intro-sched/course-intro-sched.js"]
            },{
                name:"courseTeacher",
                files:["/components/course-teacher/course-teacher.js"]
            },{
                name:"courseStudents",
                files:["/components/course-students/course-students.js"]
            },{
                name:"courseWare",
                files:["/components/course-ware/course-ware.js"]
            },{
                name:"homework",
                files:["/components/homework/homework.js"]
            },{
                name:"homeworkMain",
                files:["/components/homework-main/homework-main.js"]
            },{
                name:"postList",
                files:["/components/post-list/post-list.js"]
            },{
                name:"postDetail",
                files:["/components/post-detail/post-detail.js"]
            },{
                name:"self", 
                files:["/components/self/self.js"]
            }]
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
            .state('course', {
                url:'/courses/:course_id',
                templateUrl: '/components/course-main/course-main.html',
                controller: 'courseMain',
                reloadOnSearch: false,
                resolve:{
                    courseMain: function($ocLazyLoad){
                        return $ocLazyLoad.load(['courseMain'])
                    }
                }
            })
            .state('course.intro', {
                url: '/intro',
                templateUrl: 'components/course-intro-sched/course-intro-sched.html',
                controller: 'courseIntroSched',
                resolve: {
                    courseIntroSched: function($ocLazyLoad){
                        return $ocLazyLoad.load(['courseIntroSched'])
                    }
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
