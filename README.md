# jest-matchers

[![Build Status](https://semaphoreci.com/api/v1/djforth/jest-matchers/branches/master/badge.svg)](https://semaphoreci.com/djforth/jest-matchers)

Custom matcher for testing jest

## Install

```bash
yarn add -D @djforth/jest-matchers
```

## Adding to jest-matcher to jest config

In your jest config add the following:

```json
{
"setupTestFrameworkScriptFile": "@djforth/jest-matchers",
}
```

## Matchers:

This includes Jasmine-matchers (which work with jest), see https://github.com/JamieMason/Jasmine-Matchers for details of matchers

### Immutable Matchers

Matchers for [Immutable JS](http://facebook.github.io/immutable-js/)

Matcher | Example
:-------|:-------
toBeImmutableMap | `expect(Immutable.Map()).toBeImmutableMap();`
toBeImmutableList | `expect(Immutable.List()).toBeImmutableList();`
toBeImmutableOrderedMap | `expect(Immutable.OrderedMap()).toBeImmutableOrderedMap();`
equalsImmutable | `expect(Immutable.Map()).equalsImmutable(Immutable.Map());`
hasImmutableKey | `expect(Immutable.Map()).hasImmutableKey(Immutable.Map());`
### Moment Matchers

Matchers for [Moment JS](http://momentjs.com/docs).  Based on moments [query methods](http://momentjs.com/docs/#/query/)

Matcher | Example
:-------|:-------
toBeMoment | `expect(moment()).toBeMoment();`
equalsMoment | `expect(moment()).equalsMoment(moment());`
toBeAfter | `expect(moment('28-01-2013')).toBeAfter(moment('27-01-2013'));`
toBeBefore | `expect(moment('28-01-2013')).toBeBefore(moment('29-01-2013'));`
toBeSameOrAfter | `expect(moment('28-01-2013')).toBeSameOrAfter(moment('28-01-2013'));`
toBeSameOrBefore | `expect(moment('28-01-2013')).toBeSameOrBefore(moment('28-01-2013'));`
toBeBetween | `expect(moment('28-01-2013')).toBeBetween({start: moment('27-01-2013'), finish: moment('29-01-2013')}));`

## Element matchers

Matcher | Example
:-------|:-------
toBeElement | `expect(document.createElement('div')).toBeElement();`
toHaveAttribute | `expect(document.createElement('div')).toHaveAttribute('aria-hidden', 'false');`
toHaveTextContent | `expect(document.createElement('div')).toHaveTextContent('Some text');`
toHaveCssClass | `expect(document.createElement('div')).toHaveCssClass('some-class');`

## Other Matchers

Matcher | Example
:-------|:-------
toBeElement | `expect(document.createElement('div')).toBeElement();`
hasKey | `expect({foo: 'bar'}).hasKey('foo');`