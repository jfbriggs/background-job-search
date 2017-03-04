var expect = require('chai').expect;
var Queue = require('../utils/queue');

describe('Queue tests', function() {

  it('should properly add elements to the queue', function() {
    var queue = new Queue;
    queue.add(1);
    queue.add(2);
    queue.add(3);
    expect(queue.getSize()).to.equal(3);
  });

  it('should properly remove and return elements', function() {
    var queue = new Queue;
    queue.add(1);
    queue.add(2);
    queue.add(3);
    var nextEl = queue.pull();
    expect(queue.getSize()).to.equal(2);
    expect(nextEl).to.equal(1);
  });

  it('should correctly adjust size', function() {
    var queue = new Queue;
    queue.add(1);
    queue.add(2);
    queue.add(3);
    expect(queue.getSize()).to.equal(3);
    queue.pull();
    expect(queue.getSize()).to.equal(2);
  });

  it('should properly store objects in storage', function() {
    var queue = new Queue;
    queue.add({a: '1', b: '2'});
    expect(queue.pull()).to.be.an('object');
  });

});
