var blogg = angular.module('blogg', ['ngResource', 'ngRoute']);

blogg.factory('Post', ['$resource',
    function($resource){
        return $resource('/api/posts/:id',null,{
                update: {method: 'PUT'}
            });
}]);

blogg.controller('HeaderController', function($scope, $location){
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    }
});

blogg.controller('PostsController', function ($scope, Post, $resource) {
    $scope.posts = Post.query();

    $scope.destroy = function(post){
        var index=$scope.posts.indexOf(post)
        $scope.posts.splice(index,1);

        post.$delete({id: post.id})
    }
});

blogg.controller('CreatePostController', function($scope, Post, $location){
    $scope.post = new Post()

    $scope.submit = function(){
        $scope.post.$save(function(){
            $location.path('/')
        });
    }
});

blogg.controller('PostDtlController', function($scope, Post, $routeParams, $location){
    $scope.post = Post.get({id: $routeParams.postId});

    $scope.submit = function(){
        Post.update({id: $scope.post.id}, $scope.post, function(){
            $location.path('/')
        });
    }
});

blogg.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/list.html',
            controller: 'PostsController'
        })
        .when('/posts/new', {
            templateUrl: '/new.html',
            controller: 'CreatePostController'
        })
        .when('/posts/edit/:postId', {
            templateUrl: '/edit.html',
            controller: 'PostDtlController'
        })
        .when('/posts/:postId', {
            templateUrl: '/show.html',
            controller: 'PostDtlController'
        });

    $locationProvider.html5Mode(true);
});