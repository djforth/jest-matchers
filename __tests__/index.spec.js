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

  // describe('toBeDeeplyEqual', ()=>{
  //   let obj;
  //   beforeAll(()=>{
  //     obj = {level1: {level2: {level3: 'foo'}}}
  //   })

  //   test('is Deeply Equal', function(){
  //     expect(obj).toBeDeeplyEqual(obj);
  //   });

  //   test('is not Deeply Equal', function(){
  //     let expected = {level1: {level2: {level3: 'Foo'}}}
  //     expect(obj).toEqual(expected)
  //     expect(obj).not.toBeDeeplyEqual(expected);
  //   });
  // });

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

  describe('equalsMoment', ()=>{
    let date;
    beforeAll(()=>{
      date = moment('12-05-1975', 'DD-MM-YYYY');

    });

    test('should match date string', ()=>{
      expect(date).equalsMoment({date:'12-05-1975', fmt:'DD-MM-YYYY'});
    });

    test('should match moment date ', ()=>{
      expect(date).equalsMoment(moment('12-05-1975', 'DD-MM-YYYY'));
    });

    test('should match not moment date ', ()=>{
      expect(date).not.equalsMoment(moment('01-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeAfter', ()=>{
    let date;
    beforeAll(()=>{
      date = moment('12-05-1975', 'DD-MM-YYYY');

    });

    test('should be after date string', ()=>{
      expect(date).toBeAfter({date:'10-05-1975', fmt:'DD-MM-YYYY'});
    });

    test('should after moment date ', ()=>{
      expect(date).toBeAfter(moment('10-05-1975', 'DD-MM-YYYY'));
    });

    test('should not be after moment date ', ()=>{
      expect(date).not.toBeAfter(moment('13-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeBefore', ()=>{
    let date;
    beforeAll(()=>{
      date = moment('12-05-1975', 'DD-MM-YYYY');

    });

    test('should be before date string', ()=>{
      expect(date).toBeBefore({date:'13-05-1975', fmt:'DD-MM-YYYY'});
    });

    test('should be before moment date ', ()=>{
      expect(date).toBeBefore(moment('13-05-1975', 'DD-MM-YYYY'));
    });

    test('should not be before moment date ', ()=>{
      expect(date).not.toBeBefore(moment('10-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeSameOrAfter', ()=>{
    let date;
    beforeAll(()=>{
      date = moment('12-05-1975', 'DD-MM-YYYY');

    });

    test('should be same or after date string', ()=>{
      expect(date).toBeSameOrAfter({date:'11-05-1975', fmt:'DD-MM-YYYY'});
    });

    test('should be same or after moment date ', ()=>{
      expect(date).toBeSameOrAfter(moment('12-05-1975', 'DD-MM-YYYY'));
    });

    test('should not be same or after moment date ', ()=>{
      expect(date).not.toBeSameOrAfter(moment('14-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeSameOrBefore', ()=>{
    let date;
    beforeAll(()=>{
      date = moment('12-05-1975', 'DD-MM-YYYY');

    });

    test('should be same or before date string', ()=>{
      expect(date).toBeSameOrBefore({date:'13-05-1975', fmt:'DD-MM-YYYY'});
    });

    test('should be same or before moment date ', ()=>{
      expect(date).toBeSameOrBefore(moment('12-05-1975', 'DD-MM-YYYY'));
    });

    test('should not be same or before moment date ', ()=>{
      expect(date).not.toBeSameOrBefore(moment('11-05-1975', 'DD-MM-YYYY'));
    });
  });

   describe('toBeBetween', ()=>{
    let date;
    beforeAll(()=>{
      date = moment('12-05-1975', 'DD-MM-YYYY');

    });

    test('should be between dates', ()=>{
      let start = moment('11-05-1975', 'DD-MM-YYYY');
      let finish = moment('13-05-1975', 'DD-MM-YYYY');
      expect(date).toBeBetween({start, finish});
    });



    test('should not be same or before moment date ', ()=>{
      let start = moment('09-05-1975', 'DD-MM-YYYY');
      let finish = moment('11-05-1975', 'DD-MM-YYYY');
      expect(date).not.toBeBetween({start, finish});
    });
  });
});
