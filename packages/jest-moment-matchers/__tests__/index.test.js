const moment = require('moment');

describe('Moment Matchers', function() {
  describe('toBeMoment', function() {
    test('Is moment', function() {
      expect(moment()).toBeMoment();
    });

    test('Is not moment', function() {
      expect('foo').not.toBeMoment();
    });
  });

  describe('equalsMoment', () => {
    let date;
    beforeAll(() => {
      date = moment('12-05-1975', 'DD-MM-YYYY');
    });

    test('should match date string', () => {
      expect(date).equalsMoment({ date: '12-05-1975', fmt: 'DD-MM-YYYY' });
    });

    test('should match moment date ', () => {
      expect(date).equalsMoment(moment('12-05-1975', 'DD-MM-YYYY'));
    });

    test('should match not moment date ', () => {
      expect(date).not.equalsMoment(moment('01-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeAfter', () => {
    let date;
    beforeAll(() => {
      date = moment('12-05-1975', 'DD-MM-YYYY');
    });

    test('should be after date string', () => {
      expect(date).toBeAfter({ date: '10-05-1975', fmt: 'DD-MM-YYYY' });
    });

    test('should after moment date ', () => {
      expect(date).toBeAfter(moment('10-05-1975', 'DD-MM-YYYY'));
    });

    test('should not be after moment date ', () => {
      expect(date).not.toBeAfter(moment('13-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeBefore', () => {
    let date;
    beforeAll(() => {
      date = moment('12-05-1975', 'DD-MM-YYYY');
    });

    test('should be before date string', () => {
      expect(date).toBeBefore({ date: '13-05-1975', fmt: 'DD-MM-YYYY' });
    });

    test('should be before moment date ', () => {
      expect(date).toBeBefore(moment('13-05-1975', 'DD-MM-YYYY'));
    });

    test('should not be before moment date ', () => {
      expect(date).not.toBeBefore(moment('10-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeSameOrAfter', () => {
    let date;
    beforeAll(() => {
      date = moment('12-05-1975', 'DD-MM-YYYY');
    });

    test('should be same or after date string', () => {
      expect(date).toBeSameOrAfter({ date: '11-05-1975', fmt: 'DD-MM-YYYY' });
    });

    test('should be same or after moment date ', () => {
      expect(date).toBeSameOrAfter(moment('12-05-1975', 'DD-MM-YYYY'));
    });

    test('should not be same or after moment date ', () => {
      expect(date).not.toBeSameOrAfter(moment('14-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeSameOrBefore', () => {
    let date;
    beforeAll(() => {
      date = moment('12-05-1975', 'DD-MM-YYYY');
    });

    test('should be same or before date string', () => {
      expect(date).toBeSameOrBefore({ date: '13-05-1975', fmt: 'DD-MM-YYYY' });
    });

    test('should be same or before moment date ', () => {
      expect(date).toBeSameOrBefore(moment('12-05-1975', 'DD-MM-YYYY'));
    });

    test('should not be same or before moment date ', () => {
      expect(date).not.toBeSameOrBefore(moment('11-05-1975', 'DD-MM-YYYY'));
    });
  });

  describe('toBeBetween', () => {
    let date;
    beforeAll(() => {
      date = moment('12-05-1975', 'DD-MM-YYYY');
    });

    test('should be between dates', () => {
      const start = moment('11-05-1975', 'DD-MM-YYYY');
      const finish = moment('13-05-1975', 'DD-MM-YYYY');
      expect(date).toBeBetween({ start, finish });
    });

    test('should not be same or before moment date ', () => {
      const start = moment('09-05-1975', 'DD-MM-YYYY');
      const finish = moment('11-05-1975', 'DD-MM-YYYY');
      expect(date).not.toBeBetween({ start, finish });
    });
  });
});
