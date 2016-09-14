var keypather = require('../index')();

describe('mixed', function () {
  describe("keypather.get(obj, 'foo()['bar'].baz')", function () {
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
    it('should get the value', function () {
      keypather.get(this.obj, "foo()['bar'].baz").should.eql(this.obj.foo().bar.baz);
    });
  });
  describe("keypather.get(obj, 'foo().bar['baz']')", function () {
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
    it('should get the value', function () {
      keypather.get(this.obj, "foo().bar['baz']").should.eql(this.obj.foo().bar.baz);
    });
  });
  describe("keypather.get(obj, '['foo'].bar.baz()')", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: {
            baz: function () {
              return 'val';
            }
          }
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "['foo'].bar.baz()").should.eql(this.obj.foo.bar.baz());
    });
  });
  describe("keypather.get(obj, '['foo'].bar().baz')", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: function () {
            return {
              baz: 'val'
            };
          }
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "['foo'].bar().baz").should.eql(this.obj.foo.bar().baz);
    });
  });
  describe("keypather.get(obj, 'foo.bar()['baz']')", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: function () {
            return {
              baz: 'val'
            };
          }
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "foo.bar()['baz']").should.eql(this.obj.foo.bar().baz);
    });
  });
  describe("keypather.get(obj, 'foo['bar'].baz()')", function () {
    before(function () {
      this.obj = {
        foo: {
          bar: {
            baz: function () {
              return 'val';
            }
          }
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "foo['bar'].baz()").should.eql(this.obj.foo.bar.baz());
    });
  });
  describe('most complicated get', function() {
    before(function () {
      this.obj = {
        NetworkSettings: {
          Ports: {
            '15000/tcp': [ {
              HostIp: '0.0.0.0',
              HostPort: '49166'
            } ],
          }
        }
      };
    });
    it('should get the value', function () {
      keypather.get(this.obj, "NetworkSettings.Ports['15000/tcp'][0].HostPort").should.eql(this.obj.NetworkSettings.Ports['15000/tcp'][0].HostPort);
    });
  });
});