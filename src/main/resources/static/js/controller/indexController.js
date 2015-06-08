(function(){
    'use strict';
    angular.module('rcw').controller('indexController',function($scope,$location,recordService){

        /**
         * 指定した文字列の長さと現在の文字列長に応じてクラス名を返す
         * @param targetModel 対象文字列
         * @param targetLength 最大文字列長
         * @return targetModelの文字長に応じたクラス名
         */
        var lengthCheck = function(targetModel ,targetLength){
            if(angular.isUndefined(targetModel)){
                return 'text-muted';
            }else{
                var warningLength = parseInt(targetLength * 0.9);
                if(targetModel.length > targetLength){
                    return 'text-danger';
                }else if(targetModel.length > warningLength){
                    return 'text-warning';
                }else{
                    return 'text-muted';
                }
            }
        };

        /**
         * レコード一覧取得の初期化処理
         */
        var initRecordForm = function(){
            $scope.editRecord = false;
            $scope.record = '';
            $scope.title = '';
            if(angular.isDefined($scope.form) && angular.isFunction($scope.form.$setPristine)){
                $scope.form.$setPristine(); //formの状態をユーザーに操作されていない状態とする
            }
            $scope.editTargetRecord = null;
            getRecord();
        };

        /**
         * レコード一覧を取得する
         */
        var getRecord = function(){
            if($location.absUrl().match(/ajaxIndex/)){
                $scope.records = recordService.records.query();
            }
        };

        /**
         * レコードの新規作成を行う
         */
        var createRecord = function(){
            var record = {
                'title'     :   $scope.title,
                'record'    :   $scope.record
            };
            recordService.createRecord.save(record).$promise.then(function(){
                initRecordForm();
            });
        };

        /**
         * 指定したレコードを削除する
         * @param id 削除対象レコードid
         */
        var deleteRecord = function(id){
            recordService.record.delete({'id':id}).$promise.then(function(){
                initRecordForm();
            });
        };

        /**
         * 指定したレコードを編集対象とする
         * @param selectRecord 編集対象レコード
         */
        var selectEditTargetRecord = function(selectRecord){
            $scope.editRecord = true;
            recordService.record.get({'id':selectRecord.id}).$promise.then(function(record) {
                $scope.editTargetRecord = record;
            });
        };

        /**
         * レコード編集からレコード作成への切り替えを行う
         */
        var releaseTargetRecord = function(){
            $scope.editRecord = false;
            $scope.record = '';
            $scope.title = '';
            $scope.editTargetRecord = null;
            if(angular.isDefined($scope.form) && angular.isFunction($scope.form.$setPristine)){
                $scope.form.$setPristine();
            }
        };

        /**
         * レコードの更新を行う
         */
        var updateRecord = function(){
            $scope.editTargetRecord.$update().then(function(){
                initRecordForm();
            });
        };

        $scope.lengthCheck = lengthCheck;
        $scope.createRecord = createRecord;
        $scope.deleteRecord = deleteRecord;
        $scope.selectEditTargetRecord = selectEditTargetRecord;
        $scope.releaseTargetRecord = releaseTargetRecord;
        $scope.updateRecord = updateRecord;
        initRecordForm();

    });
}());
