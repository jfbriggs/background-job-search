var Queue = function() {
  this.size = 0;
  this.storage = [];
};

Queue.prototype.pull = function() {
  this.size--;
  return this.storage.shift();
}

Queue.prototype.add = function(value) {
  this.storage.push(value);
  this.size++;
  return value;
}

Queue.prototype.getSize = function() {
  return this.size;
}

module.exports = Queue;