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


app.run(function ($rootScope, getDataFrom) {
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

    $rootScope.selected = $rootScope.selectChart[0];

    getDataFrom.jonkriGet().then(function (response) {
        $rootScope.dataToChart = response.data.items;
        console.log("Get successful");
    },function (error) {
        console.log(error);
    });
});


app.controller('populationController', function ($scope, $filter, $rootScope, getDataFrom){
    $scope.image = "images/img.jpg";

    $scope.labels = [];
    $scope.data = [];


    $rootScope.$watch('dataToChart', function (newVal) {
        $scope.labels.length = 0;
        $scope.data.length = 0;
        var chartData = $filter("orderBy")(newVal, "+population");
        angular.forEach(chartData, function (value) {
            $scope.labels.push(value.name);
            $scope.data.push(value.population);
        });
    }, true);

    $scope.addCity = function () {
        getDataFrom.jonkriPost($scope.city).then(function () {
            console.log("Post successful");
        },function (error) {
            console.log(error);
        });

        $rootScope.dataToChart.push($scope.city);
        $scope.city = {};
        $scope.cityForm.$setPristine();
        $scope.cityForm.$setUntouched();
    };


    $scope.selected = $rootScope.selected;
    $scope.chartChanged = function() {
        $rootScope.chartType = $scope.selected.chart;
        $rootScope.selected = $scope.selected;
    }

});


app.controller('densityController', function ($scope, $rootScope, $filter) {
    $scope.image = "images/density.jpg";
    $scope.labels = [];
    $scope.data = [];


    $scope.areaData = {
        "Stockholm": {
            "name": "Stockholm",
            "area": 180
        },
        "Göteborg": {
            "name": "Göteborg",
            "area": 450
        },
        "Malmö": {
            "name": "Malmö",
            "area": 158.4
        },
        "Uppsala": {
            "name": "Uppsala",
            "area": 48.79
        },
        "Västerås": {
            "name": "Västerås",
            "area": 52.94
        },
        "Örebro": {
            "name": "Örebro",
            "area": 49.27
        },
        "Linköping": {
            "name": "Linköping",
            "area": 42.16
        },
        "Helsingborg": {
            "name": "Helsingborg",
            "area": 38.41
        },
        "Jönköping": {
            "name": "Jönköping",
            "area": 44.33
        },
        "Norrköping": {
            "name": "Norrköping",
            "area": 35.68
        }
    };

    console.log();
    $rootScope.$watch('dataToChart', function (newVal) {
        $scope.labels.length = 0;
        $scope.data.length = 0;
        var chartData = $filter("orderBy")(newVal, "+population");
        angular.forEach(chartData, function (value) {
            if($scope.areaData[value.name]){
                $scope.labels.push(value.name);
                //Filter "number" ger ett komma i numret, använder standard js istället
                //Tar fram arean ifrån "areaData" objektet. Delar populationen på arean och korta ner till två decimaler
                $scope.data.push((Math.round((value.population/$scope.areaData[value.name].area) * 100) / 100));
            }
        });
    }, true);


    $scope.selected = $rootScope.selected;
    $scope.chartChanged = function() {
        $rootScope.chartType = $scope.selected.chart;
        $rootScope.selected = $scope.selected;
    }

});
