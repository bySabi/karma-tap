var test = require('tape');

var count = 0;

test('a set of some tests', function (t) {
  t.test('skip this', { skip: true }, function (t) {
    t.fail('this should not even run');
    t.end();
  });

  t.test('A', function (t) {
    t.equal(++count, 1);
    t.end();
  });

  t.test('B', function (t) {
    t.test('b1', function (t) {
      t.test('bb1', function (t) {
        t.equal(++count, 2);
        t.end();
      });
      t.end();
    });

    t.test('b2', function (t) {
      t.equal(++count, 3);
      t.end();
    });

    t.test('b3', function (t) {
      t.equal(++count, 4);
      t.end();
    });

    t.end();
  });

  t.test('C', function (t) {
    t.equal(++count, 5);
    t.end();
  });

  t.skip('skip this', function (t) {
    t.fail('this should not even run');
    t.end();
  });

  t.end();
});

test('a test', function (t) {
  t.equal(++count, 6);
  t.end();
});

test.skip('skip this', function (t) {
  t.fail('this should not even run');
  t.end();
});
