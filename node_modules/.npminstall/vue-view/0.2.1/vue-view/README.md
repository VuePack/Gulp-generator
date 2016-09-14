vue-view
=======

Routing directive for Vue.js **(v0.11)**, inspired by angular ui-router. This plugin uses for routing [page.js](http://visionmedia.github.io/page.js/).
Based on `v-component`. You can use `v-transition`, `keep-alive`, `wait-for`, `transition-mode`.

All your routes you declare on the `$root` Vue object.  You can use plain routes or states, like in ui-router.

## Getting started

* Install: ` npm i vue-view --save`
* Require and use the plugin:
```js
var Vue = require('vue'),
    vueView = require('vue-view');

Vue.use(vueView);
```
* Put the `<div v-view></div>` in your main template
* Declare your routes on the `$root` VM of your app

## Usage

```html
<body>
    <div v-view></div>
</body>
```

vue-view extends the v-component.

#### plain routes
Pass `routes` option to the `router`.

```js
var Vue = require('vue'),
    vueView = require('vue-view');

Vue.use(vueView);

var app = new Vue({
    el: '#demo',
    router: {
        routes: {
            '/': {
                component: 'home',
                beforeEnter: function(ctx, next) {
                    // do somthing
                    next();
                },
                // with name of function from methods
                onEnter: 'onEnter',
                beforeLeave: function(ctx) {
                    // do somthing
                }
            },
            '/user/:id': {
                component: 'user',
                data: {
                    type: 'full'
                }
            },
            // with webpack async loading
            '/async': {
                component: function(cb) {
                    require(['./views/async1/async1.js'], function(mod) {
                        cb(mod);
                    });
                }
            },
            // with webpack async loading and bundle loader
            '/async': {
                component: require('bundle!./views/async2/async2.js')
            },
            default: '/'
        },
        options: {
            hashbang: true
        }
    },
    methods: {
        onEnter: function(ctx) {
            // do somthing
        }
    },
    events: {
        'router:beforeEnter': function(to, from) {
        },
        'router:onEnter': function(to, from) {
        },
        'router:beforeLeave': function() {
        }
    }
});
```

With plain routes you can use new methods `Vue.go(path)` for `pushState` and `Vue.redirect(path)` for `replaceState`
 in your code.

#### states
Pass `states` option to the `router`.

```js
var Vue = require('vue'),
    vueView = require('vue-view');

Vue.use(vueView);

var app = new Vue({
    el: '#demo',
    router: {
        states: {
            'home': {
                url: '/',
                component: 'home',
                beforeEnter: function(ctx, next) {
                    // do somthing
                    next();
                },
                // with name of function from methods
                onEnter: 'onEnter',
                beforeLeave: function(ctx) {
                    // do somthing
                }
            },
            'user': {
                url: '/user/:id',
                component: 'user',
                data: {
                    type: 'full'
                }
            },
            // with webpack async loading
            'async1': {
                url: '/async1',
                component: function(cb) {
                    require(['./views/async1/async1.js'], function(mod) {
                        cb(mod);
                    });
                }
            },
            // with webpack async loading and bundle loader
            'async2': {
                url: '/async2',
                component: require('bundle!./views/async2/async2.js')
            },
            default: 'home'
        },
        options: {
            activeClass: 'activeState', // optional, default: 'active'
            hashbang: true
        }
    },
    methods: {
        onEnter: function(ctx) {
            // do somthing
        }
    },
    events: {
        'router:beforeEnter': function(to, from) {
        },
        'router:onEnter': function(to, from) {
        },
        'router:beforeLeave': function() {
        }
    }
});
```
With states you can use new methods `Vue.go(state, routeParams, queryParams)` for `pushState`
and `Vue.redirect(state, routeParams, queryParams)` for `replaceState` in your code. And directive `v-go` (like ui-sref in angular ui-router, see example below).

`Vue.go` and `Vue.replace` params:
* `state`: state name
* `routeParams`: hash of route params `{ id: 2 }` (if url regexp was '/user/:id')
* `queryParams`: hash of query params `{ age: 24 }`

If url regexp has not route params (`/user`, without `:id`) and you use `Vue.go('user', { id: 2 })` then `routeParams`
become a `queryParams` => '/user?id=2'.

### Route properties

When you pass your routes to the `$root`, you can pass several properties:
  * `component`: the Vue.component id/name for the associated view or `function` with async require of the view (for webpack async loading)
  * `beforeEnter`: a callback (method or name of method on the vm) to call before route update
  * `onEnter`: a callback (method or name of method on the vm) to call after route update
  * `beforeLeave`: a callback (method or name of method on the vm) to call before route leave
  * `data`: an object that will be **merged** with the view's `$data`. This is useful when we need to use the same component for different urls but using different data
  * `wait`: must be `true`, if you want to wait for async data in your VM of some route. It tells the route
 to use `wait-for` with `readyEvent` from global routes options (default: `dataLoaded`), for example:


```js
// route (state 'home')
module.exports = {
    url: '/home',
    component: function(cb) {
        require(['./home.js'], function(mod) {
            cb(mod);
        });
    },
    wait: true
};

// VM
module.exports = {
    name: 'home',
    template: '<div>home</div>',
    compiled: function() {
        setTimeout(function() {
            this.$data.someAsyncData = someAsyncData;

            this.$emit('dataLoaded');
        }.bind(this), 200);
    }
};

```

Also `routes` or `states` option has `default` property. Pass `default: <state>` or `default: <path>`,
 depending on what you use.

### Options

You can pass a options hash to the router – it is a [page.js options](https://github.com/visionmedia/page.js#pageoptions),
and own options:
 * `activeClass` – using for class name of active state (default: `active`)
 * `readyEvent` – using for `wait-for` event, if route option `wait` equals `true` (default: `dataLoaded`)

### Events

The router will emit events on your `$root` VM: `router:beforeEnter`, `router:onEnter`, `router:beforeLeave`.

### Location context

When the router emits an events `router:beforeEnter` and `router:onEnter`, 2 parameters are passed: `toLocation` and `fromLocation`. Also these parameters are
passed to `ctx` of `beforeEnter` and `onEnter` middleware. It is an object containing some properties:
* `path`: the current path, such as `/user/2?age=24&someParam=0`
* `params`: a hash of the params from the route, something like this `{ id: 2 }`
* `component`: the name of component associated to the current route
* `query`: query string `age=24&someParam=0`
* `queryParams`: a hash of the query params `{ age: 24, someParam: 0  }`
* `state`: name of the current state (if you use states)

### $router
`$router` parameter passed to current VM `$data` with some properties:
* `params`: a hash of the params from the route
* `queryParams`: a hash of the query params
* `state`: name of the current state (if you use states)

`$router` has method `isState(stateName)`, check if the current state is `stateName`, returns boolean.

```js
this.$data.$router.isState('home')
```

## v-go directive

**Note:** to use this directive you should use states

This directive adds `href` attribute with correct url to links, and adds `click` event listener (with `Vue.go` method inside) to another DOM elements (div, span etc.),
 so you can use it with all DOM elements. Also `v-go` adds `active` class or custom class from `options.activeClass` to current `<a>` element, which state is active.

### Usage

* state name only (regexp url was `/user` or with optional param `/user/:id?`)
```html
<a v-go="user">go to user</a> => <a href="user">go to user</a>
```

* with route params (regexp url was `/user/:id`)
```html
<a v-go="user : { id: 2 }">go to user with id 2</a> => <a href="/user/2">go to user with id 2</a>
```

* with route params and query params(params `id` and `age` takes from `data` of your state VM)
```html
<a v-go="user : [{ id: id }, { age: age }]"> => <a href="/user/2?age=24">go to user with id 2</a>
```

* if url of some state has not route params (`/user` without `:id`), and you use directive like this
```html
<a v-go="user : { id: 2 }">user</a>
```
then `{ id: 2 }` become a query params => `/user?id=2`


=======
Some ideas were taken from [vue-route](https://github.com/ayamflow/vue-route).



