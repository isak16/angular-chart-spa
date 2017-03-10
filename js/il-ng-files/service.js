/**
 * Created by isak16 on 2017-03-10.
 */

app.service('getDataFrom', function ($http) {
    return {
        jonkri: function () {
            return $http({
                method: 'GET',
                url: 'http://cities.jonkri.se/0.0.0/cities'
            });
        }
    };
});

