(function(){
    'use strict';
    angular.module('rcw').controller('indexController',function($scope){

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
        $scope.lengthCheck = lengthCheck;

    });
}());
