var keypather = require('../index')();

describe('no keypath', function () {
  describe("keypather.set(obj, null, true) and get", function () {
    before(function () {
      this.obj = {
        foo: function () {
          return {
            bar: {
              baz: 'val'
            }
          };
        }
      };
    });
    it('should return the value', function () {
      keypather.set(this.obj, null, true);
      (keypather.get(this.obj, null)).should.equal(true);
    });
  });
  describe("keypather.set(obj, undefined, true) and get", function () {
    before(function () {
      this.obj = {
        foo: function () {
          return {
            bar: {
              baz: 'val'
            }
          };
        }
      };
    });
    it('should return the value', function () {
      (keypather.set(this.obj) === undefined).should.equal(true);
      keypather.set(this.obj, undefined, true);
      (keypather.get(this.obj)).should.equal(true);
    });
  });
  describe("keypather.del(obj, null)", function () {
    before(function () {
      this.obj = {
        foo: function () {
          return {
            bar: {
              baz: 'val'
            },
            'null': true
          };
        }
      };
    });
    it('should return true', function () {
      (keypather.del(this.obj, null)).should.equal(true);
      (keypather.get(this.obj, null) === undefined).should.equal(true);
    });
  });
  describe("keypather.del(obj)", function () {
    before(function () {
      this.obj = {
        foo: function () {
          return {
            bar: {
              baz: 'val'
            },
            'undefined': true
          };
        }
      };
    });
    it('should return true', function () {
      (keypather.del(this.obj)).should.equal(true);
      (keypather.get(this.obj) === undefined).should.equal(true);
    });
  });
});