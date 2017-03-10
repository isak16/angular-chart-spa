/**
 * Created by isak16 on 2017-03-02
 */
var app = angular.module('app', ['ui.router', 'chart.js']);



app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('population', {
        template: '<population></population>',
        url: "/"
    });

    $stateProvider.state('density', {
        template: '<density></density>',
        url: "/density"
    });
});


app.run(function ($rootScope) {
    //Global variabel
    $rootScope.selectChart = [{
        chart: "pie",
        label: "Pie chart"
    }, {
        chart: "bar",
        label: "Bar chart"
    }, {
        chart: "doughnut",
        label: "Doughnut chart"
    }, {
        chart: "polar",
        label: "Polar chart"
    }];


});


app.controller('populationController', function ($scope, $filter, $rootScope, getDataFrom){
    $scope.image = "images/img.jpg";

    $scope.labels = [];
    $scope.data = [];
    $scope.dataToChart = [];


    getDataFrom.jonkri().then(function (response) {
        $scope.dataToChart = response.data.items;
    },function (error) {
        console.log("error");
    });


    $scope.$watch('dataToChart', function (newVal) {
        $scope.labels.length = 0;
        $scope.data.length = 0;
        var chartData = $filter("orderBy")(newVal, "+population");
        angular.forEach(chartData, function (value) {
            $scope.labels.push(value.name);
            $scope.data.push(value.population);
        });
    }, true);

    $scope.addCity = function () {
        $scope.dataToChart.push($scope.city);

        $scope.city = {};
        $scope.cityForm.$setPristine();
        $scope.cityForm.$setUntouched();
    };


    if(!$scope.selected) $scope.selected = $rootScope.selectChart[0];
    $scope.chartChanged = function() {
        $rootScope.chartType = $scope.selected.chart;
        $rootScope.selected = $scope.selected;
    }

});


app.controller('densityController', function ($scope, $rootScope) {
    $scope.image = "images/density.jpg";
    $scope.labels = [];
    $scope.data = [];


    var fakeData = [
        {
            "name": "Sundbyberg",
            "densitet": 642
        },
        {
            "name": "Solna",
            "densitet": 982
        },
        {
            "name": "Malmö",
            "densitet": 1044
        },
        {
            "name": "Lidingö",
            "densitet": 773
        },
        {
            "name": "Järfälla",
            "densitet": 671
        },
        {
            "name": "Sollentuna",
            "densitet": 670
        },
        {
            "name": "Danderyd",
            "densitet": 627
        },
        {
            "name": "Göteborg",
            "densitet": 615
        },
        {
            "name": "Stockholm",
            "densitet": 2502
        },
        {
            "name": "Täby",
            "densitet": 567
        }
    ];

    angular.forEach(fakeData, function (value) {
        $scope.labels.push(value.name);
        $scope.data.push(value.densitet);
    });


    if(!$scope.selected) $scope.selected = $rootScope.selectChart[0];
    $scope.chartChanged = function() {
        $rootScope.chartType = $scope.selected.chart;
        $rootScope.selected = $scope.selected;
    }

});
