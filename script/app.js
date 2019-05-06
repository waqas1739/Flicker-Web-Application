var app = angular.module("miniFlickr", ['akoenig.deckgrid', 'me-lazyload']);

app.controller("PhotoCtrl", ["$http", "$scope", "$filter", function ($http, $scope, $filter) {
    $http.get("/api/v1/photos")
        .then(function (response) {
            $scope.photos = response.data;
            $scope.filteredPhotos = $scope.photos;

            $scope.pinFilter = 'all';

            $scope.searchTags = function () {
                    if ($scope.tagsFilter === '') {
                        if ($scope.pinFilter === 'all') {
                            $scope.filteredPhotos = $scope.photos;
                        } else if ($scope.pinFilter === 'pinned'){
                            $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true});
                        }
                    } else {
                        if ($scope.pinFilter === 'all') {
                            $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                        } else if ($scope.pinFilter === 'pinned') {
                            $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true, tags: $scope.tagsFilter});
                        }
                    }
            };

            $scope.pin = function (index) {
                var currentPinStatus = $scope.photos[index].pinned;
                if (currentPinStatus == null) {
                    $scope.photos[index].pinned = true;
                } else {
                    $scope.photos[index].pinned = !currentPinStatus;
                }
            };
            //Pin Button Style Class//
            $scope.togglePinned = function (pinFilter) {
                $scope.pinFilter = pinFilter; 
                if (pinFilter === 'all') {
                    if ($scope.tagsFilter === '') {
                        $scope.filteredPhotos = $scope.photos;
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                    }
                } else if (pinFilter === 'pinned') {
                    if ($scope.tagsFilter === '') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true});
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true, tags: $scope.tagsFilter});
                    }
                }
            }
        });
}]);