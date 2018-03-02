// public/javascripts/core.js
var ProjectSPA = angular.module('ProjectSPA', ['ngRoute']);
var userName = null;

// configure our routes
ProjectSPA.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        title: 'home',
        templateUrl: function() {
            return '/home' + '?userName=' + userName;
        },
        controller: 'mainController'
    })

    // route for the catalog page
    .when('/catalog', {
        title: 'Catalog',
        templateUrl: function() {
            return '/catalog' + '?userName=' + userName;
        },
        controller: 'catalogController'
    })

    // route for the catalog page
    .when('/userManagement', {
        templateUrl: function() {
            return '/userManagement' + '?userName=' + userName;
        },
        controller: 'usersController'
    })

    // route for the catalog page
    .when('/branchManagement', {
        templateUrl: function() {
            return '/branchManagement' + '?userName=' + userName;
        },
        controller: 'branchesController'
    })

    // route for the about page
    .when('/about', {
        templateUrl: function() {
            return '/about' + '?userName=' + userName;
        },
        controller: 'aboutController'
    })

    // route for the contact page
    .when('/contact', {
        templateUrl: function() {
            return '/contact' + '?userName=' + userName;
        },
        controller: 'contactController'
    })

    // route for the chat page
    .when('/chat', {
        templateUrl: function() {
            return '/chat' + '?userName=' + userName;
        },
        controller: 'chatController'
    })
});

ProjectSPA.controller('titleController', function($scope) {
    $scope.$on('$routeChangeSuccess', function(event, data) {
        $scope.pageTitle = data.title;
    });
});

// create the controller and inject Angular's $scope
ProjectSPA.controller('mainController', function($scope, $http, $location) {
    // create a message to display in our view
    $scope.message = 'Welcome to your flower shop!';

    scrollTop();
    fadeIn();

    $scope.login = function() {
        $http.post('/login', {
                userName: $scope.userName,
                password: $scope.password,
                captcha: $scope.captcha
            })
            .then(function(response) {
                var data = response.data;
                alert(data); // Show response from the server
                userName = $scope.userName;

                if (response.status == 200 && data != 'Wrong Username / Password.\nPlease try again.' && data != 'Wrong Captcha.\nPlease try again.' && data != 'Failed to authenticate') {
                    $('#loginModal').modal('toggle');
                    $('#loginBtn').hide(250);
                    $('#signInBtn').hide(250);
                    $('#logoutBtn').show(250);
                    $('#catalogPage').show(250);

                    $location.path('about');

                    scrollTop();
                    fadeIn();

                    if (data == 'Logged in as employee')
                        $('#userManagementPage').show(250);
                    else if (data == 'Logged in as manager') {
                        $('#branchManagementPage').show(250);
                        $('#userManagementPage').show(250);
                    }

                }
            });
    }

    $scope.logout = function() {
        $http.get('/logout', {})
            .then(function(response) {
                userName = null;

                $location.path('/');

                scrollTop();
                fadeIn();

                $('#loginBtn').show(250);
                $('#signInBtn').show(250);
                $('#logoutBtn').hide(250);
                $('#catalogPage').hide(250);
                $('#userManagementPage').hide(250);
                $('#branchManagementPage').hide(250);
            })
    };
});

ProjectSPA.controller('catalogController', function($scope) {
    $scope.message = 'Flower Catalog';

    scrollTop();
    fadeIn();
});

ProjectSPA.controller('usersController', function($scope, $route) {
    $scope.message = 'User Management';

    $scope.refresh = function() {
        $route.reload();

        scrollTop();
        fadeIn();
    }
});

ProjectSPA.controller('branchesController', function($scope) {
    $scope.message = 'Branch Management';

    scrollTop();
    fadeIn();
});

ProjectSPA.controller('aboutController', function($scope) {
    $scope.message = 'About us';

    scrollTop();
    fadeIn();
});

ProjectSPA.controller('contactController', function($scope, $http) {
    $scope.message = 'Contact Us';

    $scope.contact = function() {
        $http.post('/sendemail', {
                email: $scope.email,
                contactMessage: $scope.contactMessage
            })
            .then(function(response) {
                var data = response.data;
                alert(data); // Show response from the server               
                $('#contactModal').modal('toggle');
            });
    }

    scrollTop();
    fadeIn();
});

ProjectSPA.controller('chatController', function($scope) {
    $scope.message = 'Chat';

    scrollTop();
    fadeIn();
});

function fadeIn() {
    $("#main").fadeOut(0, function() {
        $(this).fadeIn(1500);
    });
}

function scrollTop() {
    $("html, body").animate({
        scrollTop: $(".container-fluid").offset().top
    }, 1500);
}