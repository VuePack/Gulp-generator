var keypather = require('../index')();

describe('functions', function () {
  describe("keypather.get(obj, 'foo()')", function () {
    before(function () {
      this.obj = {
        foo: function () {
          return 'val';
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, 'foo()').should.eql(this.obj.foo());
    });
  });
  describe("keypather.get(obj, 'foo()()')", function () {
    before(function () {
      this.obj = {
        foo: function () {
          return function () {
            return 'val';
          };
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, 'foo()()').should.eql(this.obj.foo()());
    });
  });
  describe("keypather.get(obj, '()()')", function () {
    before(function () {
      this.obj = function () {
        return function () {
          return 'val';
        };
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, '()()').should.eql(this.obj()());
    });
  });
  describe("keypather.get(obj, 'foo.bar()')", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: function () {
            return this.qux;
          },
          qux: 10
        }
      };
    });
    it('should bar with the context of foo', function () {
      keypather.get(this.obj, 'foo.bar()').should.eql(this.obj.foo.bar());
      // keypather.get(this.obj, '[foo].bar()').should.eql(this.obj.foo.bar());
    });
  });
  describe("keypather.get(obj, 'foo.ret(%)', arg)", function () {
    before(function () {
      this.obj = {
        foo: {
          ret: function (arg) {
            return arg;
          }
        }
      };
    });
    it('should invoke bar with arg', function () {
      keypather.get(this.obj, 'foo.ret(%)', 1).should.equal(this.obj.foo.ret(1));
    });
  });
  describe("keypather.get(obj, 'foo.sum(%)', args)", function () {
    before(function () {
      this.obj = {
        foo: {
          sum: function (a, b, c) {
            return a + b + c;
          }
        }
      };
    });
    it('should invoke bar with args', function () {
      keypather.get(this.obj, 'foo.sum(%).toString()', [1,2,3]).should.equal(this.obj.foo.sum(1,2,3).toString());
    });
  });
  describe("keypather.get(obj, 'foo.sum(1,2,3)'", function () {
    before(function () {
      this.obj = {
        foo: {
          sum: function (a, b, c) {
            return a + b + c;
          }
        }
      };
    });
    it('should invoke bar with args', function () {
      keypather.get(this.obj, 'foo.sum(1,2,3)').should.equal(this.obj.foo.sum(1,2,3));
    });
  });
  describe("keypather.get(obj, 'foo.sum(1,'whoa',3)'", function () {
    before(function () {
      this.obj = {
        foo: {
          sum: function (a, b, c) {
            return a + b + c;
          }
        }
      };
    });
    it('should invoke bar with args', function () {
      keypather.get(this.obj, 'foo.sum(1,"whoa",3)').should.equal(this.obj.foo.sum(1,"whoa",3));
    });
  });
  describe("keypather.get(obj, 'foo.sum(1,2,3)'", function () {
    before(function () {
      this.obj = {
        foo: {
          sum: function (a, b, c) {
            return a + b + c;
          }
        }
      };
    });
    it('should invoke bar with args', function () {
      keypather.get(this.obj, 'foo.sum(1,%,3)', 2).should.equal(this.obj.foo.sum(1,2,3));
    });
  });
  describe("keypather.get(obj, 'foo.sum(1,foo.bar,3)'", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: 2,
          sum: function (a, b, c) {
            return a + b + c;
          }
        }
      };
    });
    it('should invoke bar with args', function () {
      keypather.get(this.obj, 'foo.sum(1,foo.bar,3)').should.equal(this.obj.foo.sum(1,this.obj.foo.bar,3));
    });
  });
  describe("keypather.get(obj, 'foo.sum(1,foo.bar,3)'", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: 2,
          sum: function (a, b, c) {
            return a + b + c;
          }
        }
      };
    });
    it('should invoke bar with args', function () {
      try {
        keypather.get(this.obj, 'foo.sum(1,foo.bogus.bogus,3)').should.equal(this.obj.foo.sum(1,this.obj.foo.bar,3));
      }
      catch (err) {
        err.message.should.match(/foo[.]bogus[.]bogus/);
      }
    });
  });
  describe("keypather.get(obj, 'foo.ret(foo.bar)'", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: '',
          ret: function (val) {
            return val;
          }
        }
      };
    });
    it('should invoke bar with args (empty string)', function () {
      keypather.get(this.obj, 'foo.ret(foo.bar)').should.equal(this.obj.foo.ret(this.obj.foo.bar));
    });
  });
});
