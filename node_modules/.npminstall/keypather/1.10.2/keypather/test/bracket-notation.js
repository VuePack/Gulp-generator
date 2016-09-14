var keypather = require('../index')();

describe('bracket notation', function () {
  describe("keypather.get(obj, 'foo['bar']')", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: Math.random()
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "foo['bar']").should.eql(this.obj.foo.bar);
    });
  });
  describe("keypather.get(obj, 'foo['bar']['baz']')", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: {
            baz: Math.random()
          }
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "foo['bar']['baz']").should.eql(this.obj.foo.bar.baz);
    });
  });
  describe("keypather.get(obj, '['foo.bar.baz']')", function () {
    before(function () {
      this.obj = {foo:{bar:{baz:'foo.bar.bas'}}};
      this.obj['foo.bar.baz'] = Math.random();
    });
    it('should get the value', function () {
      keypather.get(this.obj, "['foo.bar.baz']").should.eql(this.obj['foo.bar.baz']);
    });
  });
  describe("keypather.get(obj, 'some['foo.bar.baz']')", function () {
    before(function () {
      this.obj = {foo:{bar:{baz:'foo.bar.bas'}}};
      this.obj['foo.bar.baz'] = Math.random();
      this.obj.some = { 'foo.bar.baz': Math.random() };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "some['foo.bar.baz']").should.eql(this.obj.some['foo.bar.baz']);
    });
  });
  describe("keypather.get(obj, '['foo.bar.baz'].some')", function () {
    before(function () {
      this.obj = {foo:{bar:{baz:'foo.bar.bas'}}};
      this.obj['foo.bar.baz'] = {
        one: Math.random(),
        some: Math.random()
      };
      this.obj.some = { 'foo.bar.baz': Math.random() };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "['foo.bar.baz'].some").should.eql(this.obj['foo.bar.baz'].some);
    });
  });
  describe("keypather.get(obj, '['foo.bar.baz']['his.hers']')", function () {
    before(function () {
      this.obj = {foo:{bar:{baz:'foo.bar.bas'}}};
      this.obj['foo.bar.baz'] = {
        one: Math.random(),
        some: Math.random(),
        'his.hers': Math.random()
      };
      this.obj.some = { 'foo.bar.baz': Math.random() };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "['foo.bar.baz']['his.hers']").should.eql(this.obj['foo.bar.baz']['his.hers']);
    });
  });
});
