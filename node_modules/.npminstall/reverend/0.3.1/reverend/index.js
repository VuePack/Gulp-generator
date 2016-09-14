/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2014 eBay Software Foundation                               │
 │                                                                            │
 │  Licensed under the Apache License, Version 2.0 (the "License");           │
 │  you may not use this file except in compliance with the License.          │
 │  You may obtain a copy of the License at                                   │
 │                                                                            │
 │    http://www.apache.org/licenses/LICENSE-2.0                              │
 │                                                                            │
 │  Unless required by applicable law or agreed to in writing, software       │
 │  distributed under the License is distributed on an "AS IS" BASIS,         │
 │  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
 │  See the License for the specific language governing permissions and       │
 │  limitations under the License.                                            │
 \*───────────────────────────────────────────────────────────────────────────*/
 // RegExp patterns used from: https://github.com/component/path-to-regexp (MIT)
'use strict';

var path2regex = require('path-to-regexp');


module.exports = function reverend(route, obj) {
    var keys, path, routeRegex;

    // Support `route` being an array (which path-to-regexp supports), and
    // prefer the first item because we want the best-fit URL.
    if (Array.isArray(route)) {
        route = route[0];
    }

    // Restrict `route` to Strings since a RegExp route can't be used to
    // generate a path (path-to-regexp supports RegExp route paths).
    if (typeof route !== 'string') {
        throw new TypeError('route must be a String path');
    }

    keys = [];
    path = route;
    routeRegex = path2regex(route, keys);

    keys.forEach(function (key) {
        var value, regex;

        value = obj[key.name];

        // Enforce required keys having a value.
        if (!key.optional && value === undefined) {
            throw new RangeError('A value must be provided for: ' + key.name);
        }

        // Pattern used in both unnamed (e.g., "/posts/(.*)") and custom match
        // parameters (e.g., "/posts/:id(\\d+)").
        regex = '\\(((?:\\\\.|[^)])*)\\)';

        // A key's `name` will be a String for named parameters, and a Number
        // for unnamed parameters. This prefixes the base regexp pattern with
        // the name, and makes the custom-matching part optional (which follows
        // what path-to-regexp does.)
        if (typeof key.name === 'string') {
            regex = '\\:' + key.name + '(?:' + regex + ')?';
        }

        // Append suffix pattern.
        regex += '([+*?])?';

        if (key.optional && value === undefined) {
            // No value so remove potential trailing '/'
            // since the path segment is optional.
            value = '';
            regex += '\\/?';
        }

        value = encodeURIComponent(value);
        path = path.replace(new RegExp(regex), value);
    });


    // Make sure the `path` produced will actually be matched by the `route`.
    if (!routeRegex.test(path)) {
        throw new RangeError('"' + path + '" will not match: "' + route + '"');
    }

    return path;
};
