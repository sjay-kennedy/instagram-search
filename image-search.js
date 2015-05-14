angular.module('instagramSearch', [])

.controller('imageSearch', function($scope, $timeout, $q, $http) {
    $scope.getImages = function(tag, nextUrl) {
        function wait() {
            var defer = $q.defer();
            $timeout(function() {
                defer.resolve();
            }, 1000);
            return defer.promise;
        }
        $scope.loaded='loading';
        var request = {
            client_id: "42205d095a124d65a29b630908989b27",
            callback: "JSON_CALLBACK",
            count: 40
        };
        if (nextUrl) {
            var url = nextUrl
        }else {
            var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent";
        }
        $http({
            method: 'JSONP',
            url: url,
            params: request
        })
        .success(function(result) {
            $scope.result = result;
            $scope.images = $scope.result.data;
            $scope.next = $scope.result.pagination.next_url;
                console.log('result', result);
        })
        .error(function() {
                $scope.loaded = false;
                $scope.errorMessage = "You won't find what you are looking for here."
        })
        .then(wait)
        .then(function() {
            $scope.loaded = true;
        })
    };
});