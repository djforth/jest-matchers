const { Map, List, OrderedMap } = require('immutable');

describe('Immutable Matchers', function() {
  describe('toBeImmutableList', function() {
    test('Is a Immutable list', function() {
      expect(List()).toBeImmutableList();
    });

    test('Is not Immutable list', function() {
      expect(Map()).not.toBeImmutableList();
    });
  });

  describe('toBeImmutableMap', function() {
    test('Is a Immutable map', function() {
      expect(Map()).toBeImmutableMap();
    });

    test('Is not Immutable Map', function() {
      expect(List()).not.toBeImmutableMap();
    });
  });

  describe('toBeImmutableOrderedMap', function() {
    test('Is a Immutable ordered map', function() {
      expect(OrderedMap()).toBeImmutableOrderedMap();
    });

    test('Is not Immutable ordered Map', function() {
      expect(List()).not.toBeImmutableOrderedMap();
    });
  });

  describe('equalsImmutable', function() {
    let item1;
    beforeAll(() => {
      item1 = Map({ foo: 'bar' });
    });
    test('Immutable objects match', function() {
      const item2 = Map({ foo: 'bar' });
      expect(item1).equalsImmutable(item2);
    });

    test("Immutable objects don't match", function() {
      const item2 = Map({ bar: 'foo' });
      expect(item1).not.equalsImmutable(item2);
    });
  });
});
