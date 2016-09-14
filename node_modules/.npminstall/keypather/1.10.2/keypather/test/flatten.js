var keypather = require('../index')();

describe('flatten', function () {
  describe("keypather.flatten(obj)", function () {
    describe('simple', function() {
      before(function () {
        this.obj = {
          foo: Math.random()
        };
      });
      it('should get the value', function () {
        keypather.flatten(this.obj).should.eql({
          foo: this.obj.foo
        });
      });
    });
    describe('nested', function() {
      before(function () {
        this.obj = {
          foo: {
            bar: Math.random()
          }
        };
      });
      it('should get the value', function () {
        keypather.flatten(this.obj).should.eql({
          'foo.bar': this.obj.foo.bar
        });
      });
    });
    describe('mixed', function() {
      before(function () {
        this.obj = {
          foo: {
            qux: 10
          },
          bar: [
            1,
            {
              yolo: [1]
            }
          ]
        };
      });
      it('should get the value', function () {
        keypather.flatten(this.obj).should.eql({
          'foo.qux': 10,
          'bar[0]': 1,
          'bar[1].yolo[0]': 1
        });
      });
    });
    describe('null', function () {
      before(function () {
        this.obj = {
          num: new Number(1), // ignore
          wiz: null,
          foo: {
            qux: 10
          },
          bar: [
            1,
            {
              yolo: [1]
            }
          ]
        };
      });
      it('should get the value', function () {
        keypather.flatten(this.obj).should.eql({
          'num': new Number(1),
          'wiz': null,
          'foo.qux': 10,
          'bar[0]': 1,
          'bar[1].yolo[0]': 1
        });
      });
    });
  });
  describe("keypather.flatten(arr)", function () {
    describe('simple', function() {
      before(function () {
        this.obj = [
          'foo',
          'bar'
        ];
      });
      it('should get the value', function () {
        keypather.flatten(this.obj).should.eql({
          '[0]': 'foo',
          '[1]': 'bar'
        });
      });
    });
    describe('mixed', function() {
      before(function () {
        this.obj = [
          {
            foo: {
              qux: 10
            },
            bar: [
              1,
              {
                yolo: true
              }
            ]
          },
          'hello'
        ];
      });
      it('should get the value', function () {
        keypather.flatten(this.obj).should.eql({
          '[0].foo.qux': 10,
          '[0].bar[0]': 1,
          '[0].bar[1].yolo': true,
          '[1]': 'hello'
        });
      });
    });
    describe('delimeter', function() {
      before(function () {
        this.obj = {
          foo: {
            qux: 'hello',
            bar: [1]
          }
        };
      });
      it('should expand the object', function(done) {
        keypather.flatten(this.obj, '__').should.eql({
          'foo__qux': 'hello',
          'foo__bar[0]': 1
        });
        done();
      });
    });
  });
});
