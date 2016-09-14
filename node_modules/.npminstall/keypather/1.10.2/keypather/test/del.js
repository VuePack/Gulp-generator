var keypather = require('../index')();

describe('del', function () {
  describe("keypather.del(obj, 'foo.bar')", del("foo.bar"));
  describe("keypather.del(obj, '['foo'].bar')", del("['foo'].bar"));
  describe("keypather.del(obj, 'foo['bar']')", del("foo['bar']"));
  describe("keypather.del(obj, '['foo']['bar']')", del("['foo']['bar']"));
  describe("keypather.del(obj, 'foo.no.no')", del("foo.no.no", true));
  describe("keypather.del(obj, '['foo'].no.no')", del("['foo'].no.no", true));
  describe("keypather.del(obj, 'foo['no']['no']')", del("foo['no']['no']", true));
  describe("keypather.del(obj, '['foo']['no']['no']')", del("['foo']['no']['no']", true));
  describe("keypather.del(obj, 'foo.bar.boom')", del("foo.bar.boom", false, true));
});

function del (keypath, missing, nestedMissing) {
  return function () {
    before(function () {
      this.obj = {
        foo: {
          bar: {
            boom: 'orig-value'
          },
          qux: 1
        }
      };
    });
    it('should del the value', function () {
      keypather.del(this.obj, keypath).should.equal(true);
      if (missing) {
        this.obj.should.eql({
          foo: {
            bar: {
              boom: 'orig-value'
            },
            qux: 1
          }
        });
      } else if (nestedMissing) {
        this.obj.should.eql({
          foo: {
            bar: {},
            qux: 1
          }
        });
      } else {
        this.obj.should.eql({
          foo: {
            qux: 1
          }
        });
      }
    });
  };
}