const { CreateMatcher, MakeMsg } = require('@djforth/jest-matchers-core');

const { Map, List, OrderedMap } = require('immutable');

const converter = {
  check: expected => Map.isMap(expected) || List.isList(expected),
  convert: expected => expected.toJS(),
};

module.exports = (() => {
  expect.extend({
    equalsImmutable: CreateMatcher(
      (actual, expected) => expected.equals(actual),
      {
        fail: "Immutable object :actual don't match :expected",
        succ: 'Immutable objects match',
      },
      converter
    ),
    hasImmutableKey: CreateMatcher(
      (actual, expected) => {
        if (isArray(expected)) {
          return actual.hasIn(expected);
        }
        return actual.has(expected);
      },
      {
        fail: 'The immutable object :actual has the key :expected',
        succ: 'The immutable object has the key :expected',
      },
      converter
    ),
    toBeImmutableList: CreateMatcher(actual => List.isList(actual), MakeMsg('Immutable list'), converter),

    toBeImmutableMap: CreateMatcher(actual => Map.isMap(actual), MakeMsg('Immutable map'), converter),

    toBeImmutableOrderedMap: CreateMatcher(
      actual => OrderedMap.isOrderedMap(actual),
      MakeMsg('Immutable map'),
      converter
    ),
  });
})();
