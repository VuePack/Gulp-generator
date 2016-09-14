# keypather [![Build Status](https://travis-ci.org/tjmehta/keypather.png?branch=master)](https://travis-ci.org/tjmehta/keypather)

Get or set a object values from a keypath string. Supports bracket notation, dot notation, and functions.
Ignores errors for deep-keypaths by default.

Safely handles string expressions - *No* ```eval``` or ```new Function``` code here!

# installation
```bash
npm install keypather
```

# Examples

## GET

dot notation, bracket notation, and functions (even with arguments) all supported:

```js
var keypath = require('keypather')();
var obj = {
  foo: {
    bar: {
      baz: 'val'
    }
  }
};
keypath.get(obj, "foo.bar.baz"); // val
keypath.get(obj, "['foo']['bar']['baz']"); // val
```

```js
var keypath = require('keypather')();
var obj = {
  foo: function () {
    return function () {
      return function () {
        return 'val';
      };
    };
  }
};
keypath.get(obj, "foo()()()"); // val
```

```js
var keypath = require('keypather')();
var obj = {
  foo: function () {
    return {
      bar: {
        baz: 'val'
      }
    };
  }
};
keypath.get(obj, "foo()['bar'].baz"); // val
```
functions with arguments
```js
var keypath = require('keypather')();
var obj = {
  create: function (data) {
    var data = data;
    return {
      get: function (key) {
        return data[key];
      }
    };
  }
};
keypath.get(obj, "create(%).get(%)", [{foo:1, bar:2}], ['foo']); // 1
keypath.get(obj, "create(%).get(%)", {foo:1, bar:2}, 'foo'); // 1, single args are automatically placed in arrays
// technically you can use anything (except dots, parens, brackets, or empty string)
// between the parens of functions that accept args (in place of %)
```

Get returns null for keypaths that do not exist by default,
but can also throw errors with `{ force: false }`

```js
var keypath = require('keypather')(); // equivalent to { force:true }
var obj = {};
keypath.get(obj, "foo.bar.baz"); // null

var keypath = require('keypather')({ force: false });
var obj = {};
keypath.get(obj, "foo.bar.baz");
// throw's an error
// Error: Cannot get 'foo' of undefined
```

## SET

mixed notation, dot notation, and bracket notation all supported:

```js
var keypath = require('keypather')();
var obj = {
  foo: {
      bar: {
        baz: 'val'
      }
    }
  }
};
keypath.set(obj, "foo['bar'].baz", 'value'); // value
keypath.set(obj, "foo.bar.baz", 'value'); // value
keypath.set(obj, "['foo']['bar']['baz']", 'value'); // value
```

 Set forces creation by default:

```js
var keypath = require('keypather')(); // equivalent to { force:true }
var obj = {};
keypath.set(obj, "foo.bar.baz", 'val'); // value
// obj = {
//   foo: {
//     bar: {
//       baz: 'val'
//     }
//   }
// };

var keypath = require('keypather')({ force: false });
var obj = {};
keypath.set(obj, "foo.bar.baz", 'val');
// throw's an error
// Error: Cannot get 'foo' of undefined
```

## IN

Equivalent to `key in obj`

```js
var keypath = require('keypather')();
var obj = {
  foo: {
      bar: {
        baz: 'val'
      }
    }
  }
};
keypath.in(obj, "foo['bar'].baz");        // true
keypath.in(obj, "foo.bar.baz");           // true
keypath.in(obj, "['foo']['bar']['baz']"); // true
// obj:
// {
//   foo: {
//     bar: {}
//   }
// }

```

## HAS

Equivalent to `obj.hasOwnProperty`

```js
var keypath = require('keypather')();
var obj = {
  foo: {
      bar: {
        baz: 'val'
      }
    }
  }
};
keypath.has(obj, "foo['bar'].baz");        // true
keypath.has(obj, "foo.bar.baz");           // true
keypath.has(obj, "['foo']['bar']['baz']"); // true
// obj:
// {
//   foo: {
//     bar: {}
//   }
// }

```

## DEL

Equivalent to `delete obj.key`

```js
var keypath = require('keypather')();
var obj = {
  foo: {
      bar: {
        baz: 'val'
      }
    }
  }
};
keypath.del(obj, "foo['bar'].baz");        // true
keypath.del(obj, "foo.bar.baz");           // true
keypath.del(obj, "['foo']['bar']['baz']"); // true
// obj:
// {
//   foo: {
//     bar: {}
//   }
// }

```

## FLATTEN

Flatten an object or array into a keypath object

```js
var keypath = require('keypather')();

keypath.flatten({
  foo: {
    qux: 'hello'
  },
  bar: [
    1,
    {
      yolo: [1]
    }
  ]
});
// returns:
// {
//   'foo.qux': 'hello',
//   'bar[0]': 1,
//   'bar[1].yolo[0]': 1
// }

/* accepts a delimiter other than '.' as second arg */

keypath.flatten({
  foo: {
    qux: 'hello'
  }
}, '__');
// returns:
// {
//   'foo__qux': 'hello',
// }

```

## EXPAND

Expand a flattened object back into an object or array

```js
var keypath = require('keypather')();

keypath.expand({
  'foo.qux': 'hello',
  'bar[0]': 1,
  'bar[1].yolo[0]': 1
});
// returns:
// {
//   foo: {
//     qux: 'hello'
//   },
//   bar: [
//     1,
//     {
//       yolo: [1]
//     }
//   ]
// }

/* expand will assume the object is an array if all the keys are numbers */

keypath.expand({
  '[0]': 1,
  '[1].yolo[0]': 1
});
// returns:[
//   1,
//   {
//     yolo: [1]
//   }
// ]

/* accepts a delimiter other than '.' as second arg */

keypath.flatten({
  foo: {
    qux: 'hello'
  }
}, '__');
// returns:
// {
//  'foo__qux': 'hello'
// }
```

# License
### MIT
