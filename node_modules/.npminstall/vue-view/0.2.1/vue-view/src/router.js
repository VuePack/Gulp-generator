'use strict';

var reverend = require('reverend');

module.exports = function(Vue, page, utils) {
    var _ = Vue.util;

    Vue._getPathFromState = function(routes, stateName, routeParams, queryParams) {
        var state = routes[stateName];

        if (!state) {
            _.warn('v-view: failed to resolve state: ' + stateName);
            return;
        }

        routeParams || (routeParams = {});

        var url = state.url;
        var path = reverend(url, routeParams);

        if (routeParams && url === path && !queryParams) {
            queryParams = routeParams;
        }

        if (queryParams) {
            path += utils.buildQuery(queryParams);
        }

        return path;
    }

    return {
        init: function() {
            this._root = this.vm.$root;
            this._router = this._root.$options.router;
            this._options = this._router.options || {};

            this._routes = this._router.routes;
            this._states = this._router.states;

            if (this._routes) {
                this._initRoutes();
            } else if (this._states) {
                this._initStates();
            } else {
                _.warn('v-view: $root must have "routes" or "states" option');
            }

            page.start(this._options);

            this._defaultRoute && this._initDefaultRoute();
        },

        _initRoutes: function() {
            var routes = this._routesType = this._routes;
            this._defaultRoute = routes.default || null;
            delete routes.default;

            Object.keys(routes).forEach(function(route) {
                this._addRoute(route);
            }.bind(this));

            Vue.go = function(path) {
                page(path);
            };

            Vue.redirect = function(path) {
                page.redirect(path);
            };
        },

        _initStates: function() {
            var states = this._routesType = this._states;
            this._defaultRoute = states.default || null;
            delete states.default;

            Object.keys(states).forEach(function(name) {
                var state = states[name];
                state.name = name;

                this._addState(state);
            }.bind(this));

            Vue.go = function(stateName, routeParams, queryParams) {
                var path = Vue._getPathFromState(states, stateName, routeParams, queryParams);

                page(path);
            };

            Vue.redirect = function(stateName, routeParams, queryParams) {
                var path = Vue._getPathFromState(states, stateName, routeParams, queryParams);

                page.redirect(path);
            };
        },

        _initDefaultRoute: function() {
            page('*', function() {
                _.nextTick(function() {
                    Vue.redirect(this._defaultRoute);
                }, this);
            }.bind(this));
        },

        _addRoute: function(url) {
            function onRoute(ctx, next) {
                this._onRoute(url, ctx, next);
            }

            page(url, onRoute.bind(this), this._beforeEnter.bind(this), this._updateRoute.bind(this));
            page.exit(url, this._beforeLeave.bind(this));
        },

        _addState: function(state) {
            var url = state.url;

            function onRoute(ctx, next) {
                this._onRoute(state.name, ctx, next);
            }

            page(url, onRoute.bind(this), this._beforeEnter.bind(this), this._updateRoute.bind(this));
            page.exit(url, this._beforeLeave.bind(this));
        },

        _beforeEnter: function(ctx, next) {
            this._callHook('beforeEnter', next);
        },

        _beforeLeave: function(ctx, next) {
            this._callHook('beforeLeave');
            next();
        },

        _onRoute: function(matchType, ctx, next) {
            var queryParams;

            function parseQueryString() {
                queryParams = {};

                ctx.querystring.split('&').map(function(pair) {
                    pair = pair.split('=');
                    queryParams[pair[0]] = pair[1];
                });
            }

            ctx.querystring && parseQueryString();

            this._routerData = this._routesType[matchType];

            this._oldLocation = this._location;

            this._location = {
                path: ctx.path,
                params: ctx.params,
                query: ctx.querystring,
                queryParams: queryParams
            };

            if (this._states) {
                this._location.state = matchType;
            }

            next();
        },

        _updateRoute: function() {
            var component = this._routerData.component;
            var components = this._root.$options.components;

            // for webpack
            if (utils.isFunction(component)) {
                this._routerData.component(function(comp) {
                    Vue.component(comp.name, comp);
                    this._location.component = comp.name;
                    this.update(comp.name);
                    this._callHook('onEnter');
                }.bind(this));
            } else {
                this.update(component);
                this._location.component = component;
                this._callHook('onEnter');
            }

        },

        _callHook: function(hook, next) {
            var callback = this._routerData[hook];
            var root = this._root;
            var location = hook === 'beforeLeave' ? null : { to: this._location, from: this._oldLocation };
            var middleware;

            if (callback) {
                if (utils.isFunction(callback)) {
                    middleware = callback;
                } else if (utils.isString(callback)) {
                    if (root[callback]) {
                        middleware = root[callback];
                    }
                }
            }

            _.nextTick(function() {
                root.$emit('router:' + hook, this._location, this._oldLocation);
            }, this);

            if (middleware) {
                middleware.call(root, location, next, this);
            } else if (next) {
                next();
            }
        }
    };
};
