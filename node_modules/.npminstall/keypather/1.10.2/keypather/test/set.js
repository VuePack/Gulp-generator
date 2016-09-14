var keypather = require('../index')();

describe('set and then get', function () {
  describe("valueForKeyPath.set(obj, 'foo', 'value')", set("foo", 'value'));
  describe("valueForKeyPath.set(obj, 'new', 'value')", set("new", 'value'));
  describe("valueForKeyPath.set(obj, 'foo.bar', 'value')", set("foo.bar", 'value'));
  describe("valueForKeyPath.set(obj, 'new.bar', 'value')", set("new.bar", 'value'));
  describe("valueForKeyPath.set(obj, 'foo.new', 'value')", set("foo.new", 'value'));
  describe("valueForKeyPath.set(obj, '[foo].bar', 'value')", set("['foo'].bar", 'value'));
  describe("valueForKeyPath.set(obj, '['new'].bar', 'value')", set("['new'].bar", 'value'));
  describe("valueForKeyPath.set(obj, 'foo[0].bar', 'value')", set("foo[0].bar", 'value'));
  describe("valueForKeyPath.set(obj, '['foo'].new', 'value')", set("['foo'].new", 'value'));
  describe("valueForKeyPath.set(obj, 'foo['bar']', 'value')", set("foo['bar']", 'value'));
  describe("valueForKeyPath.set(obj, 'new['bar']', 'value')", set("new['bar']", 'value'));
  describe("valueForKeyPath.set(obj, '['foo']['bar']', 'value')", set("['foo']['bar']", 'value'));
  describe("valueForKeyPath.set(obj, '['foo']['new']', 'value')", set("['foo']['new']", 'value'));
  describe("valueForKeyPath.set(obj, 'new.bar.foo', 'value')", set("new.bar.foo", 'value'));
  describe("valueForKeyPath.set(obj, 'new.0.foo', 'value')", set("new.0.foo", 'value'));
  describe("valueForKeyPath.set(obj, 'new.bar.foo.boom', 'value')",
    set("new.bar.foo.boom", 'value'));
  describe("valueForKeyPath.set(obj, '[\"new.bar.foo.boom\"]', 'value')",
    set('["new.bar.foo.boom"]', 'value'));
  describe("valueForKeyPath.set(obj, '[\"new.bar\"].what[\"foo.boom\"]', 'value')",
    set('[\"new.bar\"].what[\"foo.boom\"]', 'value'));
});

function set (keypath, value) {
  return function () {
    before(function () {
      this.obj = {
        foo: {
          bar: 'orig-value'
        }
      };
    });
    it('should set the value', function () {
      keypather.set(this.obj, keypath, value);
      keypather.get(this.obj, keypath).should.eql(value);
    });
  };
}