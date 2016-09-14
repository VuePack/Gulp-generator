'use strict';

module.exports = function(Vue, utils) {
    var _ = Vue.util;

    return {
        bind: function(val) {
            var root = this.vm.$root;
            var router = root.$options.router;
            var options = router.options || {};

            this._isLink = this.el.nodeName === 'A';
            this._states = router.states;
            this._activeClass = options.activeClass || 'active';

            // set active class
            if (this._isLink) {
                this._onStateChange = _onStateChange.bind(this);
                root.$on('router:onEnter', this._onStateChange);
            }
        },

        update: function(val) {
            if (!this._states) {
                _.warn('v-go: $root must have "states" option');
                return;
            }

            this._stateName = this.arg || this.expression;

            var params = this.arg && val;
            var routeParams, queryParams;

            if (params) {
                if (_.isArray(params)) {
                    routeParams = params[0];
                    queryParams = params[1];
                } else if (_.isPlainObject(params)) {
                    routeParams = params;
                }
            }

            this.init(this._stateName, routeParams, queryParams);
        },

        init: function(stateName, routeParams, queryParams) {
            var path = Vue._getPathFromState(this._states, stateName, routeParams, queryParams);

            if (this._isLink) {
                this.el.setAttribute('href', path);
            } else {
                this.onClick = Vue.go.bind(Vue, stateName, routeParams, queryParams);

                _.on(this.el, 'click', this.onClick);
            }
        },

        unbind: function() {
            this._isLink
                ? this.vm.$root.$off('router:onEnter', this._onStateChange)
                : _.off(this.el, 'click', this.onClick);

        }
    };

    function _onStateChange(toState) {
        toState.state === this._stateName
            ? _.addClass(this.el, this._activeClass)
            : _.removeClass(this.el, this._activeClass);
    }
};
