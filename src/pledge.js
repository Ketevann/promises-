'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise (executor){

  var self = this;




this._value;
this._state = "pending";

var resolve = function(data){
   self._internalResolve(data)
  }
  var reject = function(data){
    self._internalReject(data)

  }
if(executor)
  executor(resolve, reject);



}


$Promise.prototype._internalResolve = function(data) {

 if (this._state === "pending"){
 this._value = data;
 this._state = "fulfilled";
 this.then();
 }
};


$Promise.prototype._internalReject = function(reason) {
  if (this._state === "pending"){
  this._value = reason;
  this._state = "rejected";
  this.then();
}

  // body...
};

function noOp(){

}
$Promise.prototype.then = function(s, e) {


  if (typeof s !== 'function') s = false;

  if (typeof e !== 'function') e = false;

  if (!this._handlerGroups) {
    this._handlerGroups = [];
  }

  var group = {
    successCb : s,
    errorCb : e,
    downstreamPromise : new $Promise(noOp)
    };
  this._handlerGroups.push(group)

  this._callHandlers();
  // if(this._state === 'fulfilled') {
    console.log("our value "+this._value)
     return group.downstreamPromise;
  // }
}


$Promise.prototype.catch = function(e) {

  return this.then(null, e);
}

$Promise.prototype._callHandlers = function() {
if(this._state === "pending")
  return

 // if (index === undefined)
 //   i = 0;
 // else i = index
if(this._state === 'fulfilled') {
  while( this._handlerGroups.length){

    if (this._handlerGroups[0].successCb) {
      this._handlerGroups[0].successCb(this._value);
    }
    this._handlerGroups = this._handlerGroups.slice(1)
  }
  //var index = i ;
 // var temp = this._handlerGroups.slice(0);

}


if(this._state === 'rejected') {
  for(var i = 0; i < this._handlerGroups.length; i++) {

    if (this._handlerGroups[i].errorCb) {
      this._handlerGroups[i].errorCb(this._value);
    }
  }var temp = this._handlerGroups.slice(0);
  this._handlerGroups = [];
}
//return temp[0].downstreamPromise
}
//function executor (){}


/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
