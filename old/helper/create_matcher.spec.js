import CreateMatcher from 'helper/create_matcher';
// import {Map} from 'immutable';

describe('CreateMatcher', function() {
  let matcher, result;
  describe('General', function() {
    beforeAll(() => {
      matcher = CreateMatcher((actual, expected) => actual === expected, {
        fail: 'Expected :actual to equal :expected',
        succ: ':actual equalled :expected',
      });
    });

    test('should return a function', function() {
      expect(matcher).toBeFunction();
    });

    describe('if success', function() {
      beforeAll(() => {
        result = matcher(1, 1);
      });

      test('should set pass to true', function() {
        expect(result).hasKey('pass');
        expect(result.pass).toBeBoolean();
        expect(result.pass).toBeTrue();
      });

      test('should set message', function() {
        expect(result).hasKey('message');
        expect(result.message).toBeFunction();
        expect(result.message()).toEqual('1 equalled 1');
      });
    });

    describe('if failed', function() {
      beforeAll(() => {
        result = matcher(1, 2);
      });

      test('should set pass to false', function() {
        expect(result).hasKey('pass');
        expect(result.pass).toBeBoolean();
        expect(result.pass).toBeFalse();
      });

      test('should set message', function() {
        expect(result).hasKey('message');
        expect(result.message).toBeFunction();
        expect(result.message()).toEqual('Expected 1 to equal 2');
      });
    });
  });

  describe('If object', function() {
    beforeAll(() => {
      matcher = CreateMatcher((actual, expected) => actual.foo === expected.foo, {
        fail: 'Expected :actual to equal :expected',
        succ: ':actual equalled :expected',
      });
    });

    test('should return a function', function() {
      expect(matcher).toBeFunction();
    });

    describe('if success', function() {
      beforeAll(() => {
        result = matcher({ foo: 1 }, { foo: 1 });
      });

      test('should set pass to true', function() {
        expect(result).hasKey('pass');
        expect(result.pass).toBeBoolean();
        expect(result.pass).toBeTrue();
      });

      test('should set message', function() {
        expect(result).hasKey('message');
        expect(result.message).toBeFunction();
        expect(result.message()).toEqual('{"foo":1} equalled {"foo":1}');
      });
    });

    describe('if failed', function() {
      beforeAll(() => {
        result = matcher({ foo: 1 }, { foo: 2 });
      });

      test('should set pass to false', function() {
        expect(result).hasKey('pass');
        expect(result.pass).toBeBoolean();
        expect(result.pass).toBeFalse();
      });

      test('should set message', function() {
        expect(result).hasKey('message');
        expect(result.message).toBeFunction();
        expect(result.message()).toEqual('Expected {"foo":1} to equal {"foo":2}');
      });
    });
  });

  describe('If immutable object', function() {
    beforeAll(() => {
      matcher = CreateMatcher((actual, expected) => actual.equals(expected), {
        fail: 'Expected :actual to equal :expected',
        succ: ':actual equalled :expected',
      });
    });

    test('should return a function', function() {
      expect(matcher).toBeFunction();
    });

    describe('if success', function() {
      beforeAll(() => {
        result = matcher(Map({ foo: 1 }), Map({ foo: 1 }));
      });

      test('should set pass to true', function() {
        expect(result).hasKey('pass');
        expect(result.pass).toBeBoolean();
        expect(result.pass).toBeTrue();
      });

      test('should set message', function() {
        expect(result).hasKey('message');
        expect(result.message).toBeFunction();
        expect(result.message()).toEqual('{"foo":1} equalled {"foo":1}');
      });
    });

    describe('if failed', function() {
      beforeAll(() => {
        result = matcher(Map({ foo: 1 }), Map({ foo: 2 }));
      });

      test('should set pass to false', function() {
        expect(result).hasKey('pass');
        expect(result.pass).toBeBoolean();
        expect(result.pass).toBeFalse();
      });

      test('should set message', function() {
        expect(result).hasKey('message');
        expect(result.message).toBeFunction();
        expect(result.message()).toEqual('Expected {"foo":1} to equal {"foo":2}');
      });
    });
  });
});
