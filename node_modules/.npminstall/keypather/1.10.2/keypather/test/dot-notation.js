var keypather = require('../index')();

describe('dot notation', function () {
  describe("keypather.get(obj, 'foo')", function () {
    before(function () {
      this.obj = {
        foo: Math.random()
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, 'foo').should.eql(this.obj.foo);
    });
  });
  describe("keypather.get(obj, 'foo.bar')", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: Math.random()
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, 'foo.bar').should.eql(this.obj.foo.bar);
    });
  });
});