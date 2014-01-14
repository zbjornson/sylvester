Sylvester.Space = function(){};
Sylvester.Space.prototype.norm=function(v){
  return Math.sqrt(this.dot(v,v));
}
Sylvester.Space.prototype.metric=function(v1,v2){
  return this.norm(v2.map(function(e,i){return e-v1[i];}));
}
Sylvester.Space.prototype.dot=function(v1,v2){}
Sylvester.Spaces={};

Sylvester.Spaces.Eucledian=function(){};
Sylvester.Spaces.Eucledian.prototype=new Sylvester.Space();
Sylvester.Spaces.Eucledian.prototype.dot=function(v1,v2) {
  var product=0;
  for(var i=0;i<v1.length;i++)
   product+=v1[i] * v2[i];
  return product;
};

Sylvester.Spaces.Taxicab=function(){};
Sylvester.Spaces.Taxicab.prototype=new Sylvester.Spaces.Eucledian();
Sylvester.Spaces.Taxicab.prototype.norm=function(v){
  //return Math.sqrt(this.dot(v,v)+2*Math.abs(v.elements[0]*v.elements[1])+2*Math.abs(v.elements[1]*v.elements[2])+2*Math.abs(v.elements[0]*v.elements[2]));//?
  var sum=0;
  for(var i=0;i<v.length;i++)
   sum+=Math.abs(v[i]);
  return sum;
}