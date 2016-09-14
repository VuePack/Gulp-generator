var isObject = require('101/is-object');

var keypather = module.exports = function (opts) {
  var keypather = new Keypather(opts && opts.force);
  return keypather;
};

if(typeof module !== 'undefined')
{
    module.exports = keypather;
}

function Keypather (force) {
  this.force = (force !== undefined) ? Boolean(force) : true; // force - default: true
}
Keypather.prototype.get = function (/* obj, keypath, fnArgs... */) {
  this.create = false;
  return this._get.apply(this, arguments);
};
Keypather.prototype.set = function (obj, keypath, value  /*, fnArgs... */) {
  this.obj = obj;
  keypath = keypath + '';
  this.create = this.force;
  this.fnArgs = Array.prototype.slice.call(arguments, 3).map(makeArray);
  if (keypath.match(/\(\)$/)) {
    throw new Error("Invalid left-hand side in assignment");
  }

  this.keypathSplit = this.splitKeypath(keypath);
  var lastKey = this.getLastKey();
  var val = this.getLastObj(arguments, true);
  val[lastKey] = value;
  return value;
};
Keypather.prototype.in = function (obj, keypath) {
  this.obj = obj;
  keypath = keypath + '';
  this.create = false;
  if (last(keypath) === ')') {
    throw new TypeError('keypath should not end in a function');
  }

  this.keypathSplit = this.splitKeypath(keypath);
  var lastKey = this.getLastKey();
  var val = this.getLastObj(arguments);

  if (this.force && !val) {
    return false;
  }
  return lastKey in val;
};
Keypather.prototype.has = function (obj, keypath) {
  this.obj = obj;
  keypath = keypath + '';
  this.create = false;
  if (last(keypath) === ')') {
    throw new TypeError('keypath should not end in a function');
  }

  this.keypathSplit = this.splitKeypath(keypath);
  var lastKey = this.getLastKey();
  var val = this.getLastObj(arguments);

  if (this.force && !val) {
    return false;
  }
  return val.hasOwnProperty(lastKey);
};
Keypather.prototype.del = function (obj, keypath  /*, fnArgs... */) {
  this.obj = obj;
  keypath = keypath + '';
  this.create = false;
  if (last(keypath) === ')') {
    // deletes function result..does nothing. equivalent to invoking function and returning true
    // this.get(obj, keypath); // not even necessary since this doesnt actually do anything
    return true;
  }

  this.keypathSplit = this.splitKeypath(keypath);
  this.fnArgs = Array.prototype.slice.call(arguments, 2).map(makeArray);
  var lastKey = this.getLastKey();
  var val = this.getLastObj(arguments);

  if (this.force && !val) {
    return true;
  }
  delete val[lastKey];
  return true;
};
Keypather.prototype.flatten = function (obj, delimeter, preKeypath, init) {
  var arr = Array.isArray(obj);
  var def = arr ? [] : {};
  var self = this;
  return Object.keys(obj).reduce(function (out, key) {
    var val = obj[key];
    if (arr) {
      key = [ '[', key, ']' ].join('');
    }
    var keypath = exists(preKeypath) ?
      [ preKeypath, key ].join(arr ? '' : delimeter) :
      key;
    if(Array.isArray(val) || isObject(val)) {
      delimeter = exists(delimeter) ? delimeter : '.';
      self.flatten(val, delimeter, keypath, out);
    }
    else {
      out[keypath] = val;
    }

    return out;
  }, init || def);
};
var arrKeypath = /^\[[0-9]+\]/;
Keypather.prototype.expand = function (flatObj, delimeter) {
  var self = this;
  var arrSoFar = true;
  if (exists(delimeter)) {
    var delimeterRegex = new RegExp(escapeRegExp(delimeter), 'g');
  }
  var out = Object.keys(flatObj).reduce(function (out, keypath) {
    if (arrSoFar) {
      arrSoFar = arrKeypath.test(keypath);
      if (!arrSoFar) {
        // change 'out' to an 'obj'
        out = out.reduce(function (obj, key) {
          obj[key] = out[key];
          return out;
        }, {});
      }
    }
    var val = flatObj[keypath];
    if (exists(delimeter)) {
      keypath = keypath.replace(delimeterRegex, '.');
    }
    self.set(out, keypath, val);
    return out;
  }, []);

  return out;
};

// internal
Keypather.prototype._get = function (obj, keypath /*, fnArgs... */) {
  this.obj = obj;
  keypath = keypath + '';
  this.keypathSplit = this.splitKeypath(keypath);
  this.fnArgs = Array.prototype.slice.call(arguments, 2).map(makeArray);
  return this.keypathSplit.reduce(this.getValue.bind(this), obj);
};
Keypather.prototype.splitKeypath = function (keypath) {
  var dotSplit = keypath.split('.');
  var split = [];
  var openParen = false;
  var openBracket = false;
  var parenBuffer, bracketBuffer, preParen, preBracket;
  dotSplit.forEach(function groupParens (part) {
    var parenSplit, leftover, bracketSplit;
    if (part.length === 0) {
      return;
    }
    else if (!openParen && ~part.indexOf('(')) {
      openParen = true;
      parenBuffer = [];
      parenSplit = part.split('(');
      preParen = parenSplit.shift() || '';
      leftover = parenSplit.join('(');
      if (leftover.length) groupParens(leftover);
    }
    else if (openParen) {
      if (~part.indexOf(')')) {
        openParen = false;
        parenSplit = part.split(')');
        parenBuffer.push(parenSplit.shift());
        split.push(preParen+'('+parenBuffer.join('.')+')');
        leftover = parenSplit.join(')');
        if (leftover.length) groupParens(leftover);
      }
      else {
        parenBuffer.push(part);
      }
    }
    else if (!openBracket && ~part.indexOf('[')) {
      openBracket = true;
      bracketBuffer = [];
      bracketSplit = part.split('[');
      preBracket = bracketSplit.shift() || '';
      leftover = bracketSplit.join('[');
      if (leftover.length) groupParens(leftover);
    }
    else if (openBracket) {
      if (~part.indexOf(']')) {
        openBracket = false;
        bracketSplit = part.split(']');
        bracketBuffer.push(bracketSplit.shift());
        split.push(preBracket+'['+bracketBuffer.join('.')+']');
        leftover = bracketSplit.join(']');
        if (leftover.length) groupParens(leftover);
      }
      else {
        bracketBuffer.push(part);
      }
    }
    else {
      split.push(part);
    }
  });
  return split;
};
Keypather.prototype.getValue = function (val, keyPart) {
  this.indexOpenParen = keyPart.indexOf('(');
  this.indexCloseParen = keyPart.indexOf(')');
  this.indexOpenBracket = keyPart.indexOf('[');
  this.indexCloseBracket = keyPart.indexOf(']');
  var keyHasParens = ~this.indexOpenParen && ~this.indexCloseParen && (this.indexOpenParen < this.indexCloseParen);
  var keyHasBrackets = ~this.indexOpenBracket && ~this.indexCloseBracket && (this.indexOpenBracket < this.indexCloseBracket);
  this.lastVal = val;
  if (!keyHasParens && !keyHasBrackets) {
    return this.handleKey(val, keyPart);
  }
  else if (keyHasParens && (!keyHasBrackets || this.indexOpenParen < this.indexOpenBracket)) {
    return this.handleFunction(val, keyPart);
  }
  else {
    return this.handleBrackets(val, keyPart);
  }
};
Keypather.prototype.handleKey = function (val, key) {
  if (this.create && !exists(val[key])) {
    return this.createPath(val, key);
  }
  return (this.force && !exists(val)) ?
      null : val[key];
};
Keypather.prototype.handleFunction = function (val, keyPart) {
  var subKey = keyPart.slice(0, this.indexOpenParen), ctx;
  var argsStr = keyPart.slice(this.indexOpenParen+1, this.indexCloseParen);
  if (subKey) {
    if (this.create && !exists(val[subKey])) {
      throw new Error('KeypathSetError: cannot force create a path where a function does not exist');
    }
    ctx = val;
    val = (this.force && (!exists(val) || !exists(val[subKey]))) ? null :
      (this.indexOpenParen+1 === this.indexCloseParen) ?
        val[subKey].call(ctx) :
        val[subKey].apply(ctx, this.parseFunctionArgs(argsStr));
  }
  else {
    ctx = this.lastVal || global;
    val = (this.force && !exists(val)) ? null :
      (this.indexOpenParen+1 === this.indexCloseParen) ? // maintain context (this.lastVal)
        val.call(ctx) :
        val.apply(ctx, this.parseFunctionArgs(argsStr));
  }
  keyPart = keyPart.slice(this.indexCloseParen+1); // update key, slice of function
  return keyPart ? // if keypart left, back to back fn or brackets so recurse
    this.getValue(val, keyPart) : val;
};
Keypather.prototype.handleBrackets = function (val, keyPart) {
  var subKey = keyPart.slice(0, this.indexOpenBracket);
  var bracketKey = keyPart.slice(this.indexOpenBracket+1, this.indexCloseBracket);
  bracketKey = parseBracketKey(bracketKey);
  if (!exists(bracketKey)) {
    // invalid bracket structure, use key as is.
    return this.handleKey(val, keyPart);
  }
  else {
    if (subKey) {
      if (this.create) {
        if (!exists(val[subKey])) {
          return this.createPath(val, subKey, bracketKey);
        }
        if (!exists(val[subKey][bracketKey])) {
          return this.createPath(val[subKey], bracketKey);
        }
      }
      val = (this.force && (!exists(val) || !exists(val[subKey]))) ?
        null : val[subKey][bracketKey];
    }
    else {
      if (this.create && !exists(val[bracketKey])) {
        return this.createPath(val, bracketKey);
      }
      val = (this.force && !exists(val)) ?
        null : val[bracketKey];
    }
    keyPart = keyPart.slice(this.indexCloseBracket+1); // update key, slice off bracket notation
    return keyPart ? // if keypart left, back to back fn or brackets so recurse
      this.getValue(val, keyPart) : val;
  }
};
Keypather.prototype.getLastKey = function () {
  var lastKeyPart = this.keypathSplit.pop();
  var indexOpenBracket = lastKeyPart.lastIndexOf('[');
  var indexCloseBracket = lastKeyPart.lastIndexOf(']');
  var keyHasBrackets = ~indexOpenBracket && ~indexCloseBracket && (indexOpenBracket < indexCloseBracket);

  if (keyHasBrackets) {
    var bracketKey = lastKeyPart.slice(indexOpenBracket+1, indexCloseBracket);
    bracketKey = parseBracketKey(bracketKey);
    lastKeyPart = lastKeyPart.slice(0, indexOpenBracket);
    this.keypathSplit.push(lastKeyPart);
    return bracketKey;
  }
  else {
    return lastKeyPart;
  }
};
Keypather.prototype.getLastObj = function (args, setOperation) {
  var val;
  if (this.keypathSplit.length === 0) {
    val = args[0];
  }
  else {
    var getArgs = Array.prototype.slice.call(args);
    getArgs[1] = this.keypathSplit.join('.');
    val = setOperation ?
      this._get.apply(this, getArgs):
      this.get.apply(this, getArgs);
  }
  return val;
};
Keypather.prototype.createPath = function (val /*, keys */) {
  var keys = Array.prototype.slice.call(arguments, 1);
  return keys.reduce(function (val, key, i) {
    if (typeof keys[i+1] === 'number') {
      val[key] = [];
    }
    else {
      val[key] = {};
    }
    return val[key];
  }, val);
};
Keypather.prototype.parseFunctionArgs = function (argsStr) {
  argsStr = argsStr.trim();
  if (argsStr.length === 0) {
    return [];
  }
  else if (argsStr==='%') {
    return this.fnArgs.pop() || [];
  }
  var argsSplit = argsStr.split(',').map(trim);
  var replacementArgs;
  var self = this;
  return argsSplit.map(function (arg) {
    if (arg==='%') {
      replacementArgs = replacementArgs || self.fnArgs.pop() || [];
      arg = replacementArgs.pop();
      return arg;
    }
    else {
      var parsed = parseBracketKey(arg);
      parsed = exists(parsed) ? parsed : keypather().get(self.obj, arg);
      if (exists(parsed)) {
        return parsed;
      }
      else {
        throw new ReferenceError('KeypatherError: Invalid function argument "'+arg+'"');
      }
    }
  });
};

function parseBracketKey (key) {
  key = key.replace(/'/g, '"'); // single quotes to double
  try {
    return JSON.parse(key);
  }
  catch (err) { //invalid
    // console.error(err);
    return;
  }
}

function exists (val) {
  return val !== null && val !== undefined;
}
function last (arrOrStr) {
  return arrOrStr[arrOrStr.length - 1];
}
function makeArray (val) {
  return Array.isArray(val) ? val : [val];
}
function trim (str) {
  return str.trim();
}
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
