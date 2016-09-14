'use strict';

module.exports = {
    isString: require('101/is-string'),
    isFunction: require('101/is-function'),

    buildQuery: function(queryParams) {
        var query = '?';

        for (var param in queryParams) {
            if (queryParams.hasOwnProperty(param)) {
                var pair = param + '=' + queryParams[param];

                if (query !== '?') {
                    pair = '&' + pair;
                }

                query += pair;
            }
        }

        return query;
    }
};
