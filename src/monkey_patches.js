Math.rand = function(max) {
  return Math.floor(max * Math.random())
}

Array.prototype.clear = function() {
  this.splice(0,this.length)
}
