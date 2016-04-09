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
                    // console.log(config.url);
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
            debug: false,
            modules: [
                {name:"ckeditor", files:["//cdn.bootcss.com/ckeditor/4.5.4/ckeditor.js"]},
                {name:"plupload", files:["//cdn.bootcss.com/plupload/2.1.8/plupload.full.min.js"]},
                {name:"Qiniu", files:["/bower_components/qiniu/src/qiniu.min.js"]},
                {name:"moment", files:["//cdn.bootcss.com/moment.js/2.11.1/moment.min.js"]},
                {name:"jQuery", files:["//cdn.bootcss.com/jquery/2.2.0/jquery.min.js"]},
                {name:"dotdotdot", files:["//cdn.bootcss.com/jQuery.dotdotdot/1.7.4/jquery.dotdotdot.min.js"]},
                
                {name:"angular-carousel", files:["//cdn.bootcss.com/angular-carousel/1.0.1/angular-carousel.min.js"]},
                {name:"ngTouch", files:["//cdn.bootcss.com/angular-touch/1.4.8/angular-touch.min.js"]},
                {name:"ngCkeditor", files:["/bower_components/ng-ckeditor/ng-ckeditor.min.js"]},
                {name:"focus-if", files:["/bower_components/ng-focus-if/focusIf.min.js"]},
                {name:"datePicker", files:["/bower_components/angular-datepicker/dist/angular-datepicker.min.js"]},

                {name:"ellipsis", files:["/directives/ellipsis.js"]},
                {name:"scrollIntoView", files:["/directives/scroll-into-view.js"]},

                {name:"usericon", files:["/components/usericon/usericon.js"]},
                {name:"navbar", files:["/components/navbar/navbar.js"]},
                
                {name:"main", files:["/components/main/main.js"]},
                {name:"login", files:["/components/login/login.js"]},
                {name:"courses", files:["/components/courses/courses.js"]},
                {name:"courseMain", files:["/components/course-main/course-main.js"]},
                {name:"courseAside", files:["/components/course-aside/course-aside.js"]},
                {name:"courseIntroSched", files:["/components/course-intro-sched/course-intro-sched.js"]},
                {name:"courseTeacher", files:["/components/course-teacher/course-teacher.js"]},
                {name:"courseStudents", files:["/components/course-students/course-students.js"]},
                {name:"courseWare", files:["/components/course-ware/course-ware.js"]},
                {name:"homework", files:["/components/homework/homework.js"]},
                {name:"homeworkMain", files:["/components/homework-main/homework-main.js"]},
                {name:"postList", files:["/components/post-list/post-list.js"]},
                {name:"postDetail", files:["/components/post-detail/post-detail.js"]},
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
                templateUrl: '/components/course-intro-sched/course-intro-sched.html',
                controller: 'courseIntroSched',
                resolve: {
                    courseIntroSched: function($ocLazyLoad){
                        return $ocLazyLoad.load(['courseIntroSched'])
                    }
                }
            })
            .state('course.sched', {
                url: '/sched',
                templateUrl: '/components/course-intro-sched/course-intro-sched.html',
                controller: 'courseIntroSched',
                resolve: {
                    courseIntroSched: function($ocLazyLoad){
                        return $ocLazyLoad.load(['courseIntroSched'])
                    }
                }
            })
            .state('course.teacher', {
                url: '/teacher',
                templateUrl: '/components/course-teacher/course-teacher.html',
                controller: 'courseTeacher',
                resolve: {
                    courseTeacher: function($ocLazyLoad){
                        return $ocLazyLoad.load(['courseTeacher'])
                    }
                }
            })
            .state('course.students', {
                url: '/students',
                templateUrl: '/components/course-students/course-students.html',
                controller: 'courseStudents',
                resolve: {
                    courseStudents: function($ocLazyLoad){
                        return $ocLazyLoad.load(['courseStudents'])
                    }
                }
            })
            .state('course.ware', {
                url: '/ware',
                templateUrl: '/components/course-ware/course-ware.html',
                controller: 'courseWare',
                resolve: {
                    courseWare: function($ocLazyLoad){
                        return $ocLazyLoad.load(['courseWare'])
                    }
                }

            })
            .state('course.homework', {
                url: '/homework',
                templateUrl: '/components/homework/homework.html',
                controller: 'homework',
                resolve: {
                    homework: function($ocLazyLoad){
                        return $ocLazyLoad.load(['homework'])
                    }
                }
            })
            .state('course.posts', {
                url: '/posts',
                templateUrl: '/components/post-list/post-list.html',
                controller: 'postList',
                resolve: {
                    homework: function($ocLazyLoad){
                        return $ocLazyLoad.load(['postList'])
                    }
                }
            })
            .state('self', {
                url:'/self',
                templateUrl: '/components/self/self.html',
                controller: 'self',
                resolve:{
                    self: function($ocLazyLoad){
                        return $ocLazyLoad.load(['self'])
                    }
                }
            });
    });



})();
