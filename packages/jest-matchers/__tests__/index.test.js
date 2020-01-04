const { readFileSync } = require('fs');
const { join } = require('path');

const htmlPath = join(__dirname, './__markup__/element.html');
const markup = readFileSync(htmlPath);

describe('Matchers', function() {
  beforeAll(() => {
    document.body.innerHTML = markup;
  });

  describe('toBeElement', function() {
    test('Is html element', function() {
      const el = document.createElement('div');
      expect(el).toBeElement();
    });

    test('Is not html element', function() {
      expect('foo').not.toBeElement();
    });
  });

  describe('toHaveAttribute', () => {
    test('should have attribute aria-hidden=false', () => {
      const el = document.getElementById('some-id');
      expect(el).toHaveAttribute('aria-hidden');
      expect(el).toHaveAttribute('aria-hidden', 'false');
    });

    test('should not attribute aria-hidden=true', () => {
      const el = document.getElementById('some-id');
      expect(null).not.toHaveAttribute('aria-hidden', 'false');

      expect(el).not.toHaveAttribute('aria-pressed', 'false');

      expect(el).not.toHaveAttribute('aria-hidden', 'true');
    });

    test('should not attribute data-test=true', () => {
      const el = document.getElementById('some-id');
      expect(el).not.toHaveAttribute('data-test', 'false');
    });
  });

  describe('toHaveTextContent', () => {
    test('should have content', () => {
      const el = document.getElementById('some-id');
      expect(el).toHaveTextContent('link');
    });

    test('should not attribute aria-hidden=true', () => {
      const el = document.getElementById('some-id');
      expect(null).not.toHaveTextContent('link');
      expect(el).not.toHaveTextContent('nothing');
    });
  });

  describe('toHaveCssClass', () => {
    test('should have css class', () => {
      const el = document.getElementById('some-id');
      expect(el).toHaveCssClass('some-class');
    });

    test('should not attribute aria-hidden=true', () => {
      const el = document.getElementById('some-id');
      expect(null).not.toHaveCssClass('some-class');
      expect(el).not.toHaveCssClass('another-class');
    });
  });

  describe('matchObject', () => {
    let obj;
    beforeAll(() => {
      obj = { level1: { level2: { level3: 'foo' } } };
    });

    test('is Deeply Equal', function() {
      expect(obj).matchObject(obj);
    });

    test('is not Deeply Equal', function() {
      const expected = { level1: { level2: { level3: 'Foo' } } };
      // expect(obj).toEqual(expected)
      expect(obj).not.matchObject(expected);
    });
  });

  describe('hasKey', function() {
    let item;
    beforeAll(() => {
      item = { foo: 'bar' };
    });
    test('Objects has key', function() {
      expect(item).hasKey('foo');
    });

    test("objects doesn't have key", function() {
      expect(item).not.hasKey('bar');
    });
  });
});
