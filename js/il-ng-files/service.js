/**
 * Created by isak16 on 2017-03-10.
 */

app.service('getDataFrom', function ($http) {
    this.jonkriGet = function () {
        return $http({
            method: 'GET',
            url: 'http://cities.jonkri.se/0.0.0/cities'
        });
    };
    this.jonkriPost = function (obj) {
        return $http({
            method: 'POST',
            url: 'http://cities.jonkri.se/0.0.0/cities',
            data: obj
        });
    };
});

