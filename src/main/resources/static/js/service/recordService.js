(function(){
    'use strict';
    angular.module('rcw').factory('recordService',function($resource){
        var records = $resource('/api/records');
        var record =  $resource('/api/record/:id',{ 'id' : '@id' },{update:{method:'PUT'}});
        var createRecord =  $resource('/api/record/create');
        return {
            'records'       :   records,
            'record'        :   record,
            'createRecord'  :   createRecord
        };
    });
}());