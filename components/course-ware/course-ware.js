(function() {

    angular.module('courseWare', [
        'flash'
    ]).controller('courseWare', courseWare);

    function courseWare($scope, $http, Flash, $ocLazyLoad, $q) {

        $scope.del = function($index) {
            $http({
                method: 'DELETE',
                url: 'API/ppt/'+$scope.course_id,
                params: {
                    storename: $scope.ppts[$index].storename
                }
            }).then(function(res) {
                $scope.ppts.splice($index, 1);
            })
        };


        $http({
            method: 'GET',
            url: 'API/ppt/'+$scope.course_id
        }).then(function(res) {
            $scope.ppts = res.data.ppts;
        });

        if ($scope.user.type === 'teacher') {
            $q.all([
                $ocLazyLoad.load(['plupload','Qiniu']),
                $http({
                    method: 'GET',
                    url: 'API/ppt/token'
                }).then(function(res) {
                    $scope.token = res.data.token;
                })
            ]).then(function() {
                qiniuInit();
            });
        }


        function qiniuInit() {
            Qiniu.uploader({
                runtimes: 'html5,flash,html4',    //上传模式,依次退化
                browse_button: 'upload-button',       //上传选择的点选按钮，**必需**
                uptoken: $scope.token,
                //unique_names 默认false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
                unique_names: true,
                //save_key 默认 false。若在服务端生成uptoken的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
                //save_key: false,
                //domain为bucket 域名，下载资源时用到，**必需**
                domain: 'http://7xnvbh.com1.z0.glb.clouddn.com',
                container: 'upload-wrap',           //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '100mb',           //最大文件体积限制
                flash_swf_url: '/bower_components/plupload/js/Moxie.swf',  //引入flash,相对路径
                max_retries: 3,                   //上传失败最大重试次数
                dragdrop: true,                   //开启可拖曳上传
                drop_element: 'upload-wrap',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                //分块上传时，每片的体积
                auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                x_vars: {
                    course_id: $scope.course_id
                },
                init: {
                    'FilesAdded': function(up, files) {
                        // plupload.each(files, function(file) {
                        // });
                    },
                    'BeforeUpload': function(up, file) {
                        Flash.create("info", "正在上传"+file.name);
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时,处理相关的事情
                    },
                    'FileUploaded': function(up, file, info) {
                        info = JSON.parse(info);
                        if (info.code === 0) {
                            Flash.create("success", "上传成功："+file.name);
                            $scope.ppts.push(info.content[0]);
                        } else
                            Flash.create("danger", "上传失败："+file.name);
                        // 每个文件上传成功后,处理相关的事情
                        // 其中 info 是文件上传成功后，服务端返回的json
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                        // var domain = up.getOption('domain');
                        // var res = parseJSON(info);
                        // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                    },
                    'Error': function(up, err, errTip) {
                        //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function() {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    'Key': function(up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在 unique_names: false , save_key: false 时才生效
                    }
                }
            });
        }

    } //end of controller





})();