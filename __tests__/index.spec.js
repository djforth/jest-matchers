import moment from 'moment';
import Immutable, {Map, List, OrderedMap} from 'immutable';

describe('Matchers', function(){
  describe('toBeElement', function(){
    test('Is html element', function(){
      let el = document.createElement('div');
      expect(el).toBeElement();
    });

    test('Is not html element', function(){
      expect('foo').not.toBeElement();
    });
  });

  describe('toBeMoment', function(){
    test('Is moment', function(){
      expect(moment()).toBeMoment();
    });

    test('Is not moment', function(){
      expect('foo').not.toBeMoment();
    });
  });

  describe('toBeImmutableList', function(){
    test('Is a Immutable list', function(){
      expect(List()).toBeImmutableList();
    });

    test('Is not Immutable list', function(){
      expect(Map()).not.toBeImmutableList();
    });
  });

  describe('toBeImmutableMap', function(){
    test('Is a Immutable map', function(){
      expect(Map()).toBeImmutableMap();
    });

    test('Is not Immutable Map', function(){
      expect(List()).not.toBeImmutableMap();
    });
  });

  describe('toBeImmutableOrderedMap', function(){
    test('Is a Immutable ordered map', function(){
      expect(OrderedMap()).toBeImmutableOrderedMap();
    });

    test('Is not Immutable ordered Map', function(){
      expect(List()).not.toBeImmutableOrderedMap();
    });
  });

  describe('equalsImmutable', function(){
    let item1;
    beforeAll(()=>{
      item1 = Map({foo: 'bar'});
    });
    test('Immutable objects match', function(){
      let item2 = Map({foo: 'bar'});
      expect(item1).equalsImmutable(item2);
    });

    test('Immutable objects don\'t match', function(){
      let item2 = Map({bar: 'foo'});
      expect(item1).not.equalsImmutable(item2);
    });
  });

  describe('hasKey', function(){
    let item;
    beforeAll(()=>{
      item = {foo: 'bar'};
    });
    test('Objects has key', function(){
      expect(item).hasKey('foo');
    });

    test('objects doesn\'t have key', function(){
      expect(item).not.hasKey('bar');
    });
  });

  describe('hasImmutableKey', function(){
    let item, complex;
    beforeAll(()=>{
      complex = Immutable.fromJS({foo: {bar: 'text'}});
      item = Map({foo: 'bar'});
    });
    test('Immutable Map has key', function(){
      expect(item).hasImmutableKey('foo');
    });

    test('Immutable Map has key array', function(){
      expect(complex).hasImmutableKey(['foo', 'bar']);
    });

    test('Immutable Map doesn\'t have key', function(){
      expect(item).not.hasImmutableKey('bar');
    });

    test('Immutable Map doesn\'t have key array', function(){
      expect(complex).not.hasImmutableKey(['bar', 'foo']);
    });
  });
});
