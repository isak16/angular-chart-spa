/**
 * Created by isak16 on 2017-03-10.
 */


app.directive('population', function () {
    return {
        controller: 'populationController',
        templateUrl: './partials/population.html'
    };
});

app.directive('density', function () {
    return {
        controller: 'densityController',
        templateUrl: './partials/density.html'
    };
});

app.directive('charts', function () {
    return {
        templateUrl: './partials/charts.html'
    };
});
