angular.module('instagramSearch', [])
.controller('imageSearch', function($scope, $timeout, $q, $http) {
    $scope.getImages = function(tag, nextUrl) {
        $scope.loaded=false;
        var request = {
            client_id: "42205d095a124d65a29b630908989b27",
            callback: "JSON_CALLBACK",
            count: 40
        };
        if (nextUrl) {
            var url = nextUrl
        }else {
            var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=42205d095a124d65a29b630908989b27";
        }
        $http({
            method: 'JSONP',
            url: url,
            params: request
        }).
        success(function(result) {
            $scope.loaded = true;
            $scope.result = result;
            $scope.images = $scope.result.data;
            $scope.next = $scope.result.pagination.next_url;
            console.log('images', $scope.next);
        }).
        error(function() {
            alert('error');
        });
    };
});