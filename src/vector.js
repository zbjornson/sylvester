Sylvester.Vector = function() {};

Sylvester.Vector.create = function(elements) {
  var V = new Sylvester.Vector();
  return V.setElements(elements);
};
var $V = Sylvester.Vector.create;

Sylvester.Vector.Random = function(n) {
  var elements = [];
  while (n--) { elements.push(Math.random()); }
  return Sylvester.Vector.create(elements);
};

Sylvester.Vector.Zero = function(n) {
  n=n||3;
  var elements = [];
  while (n--) { elements.push(0); }
  return Sylvester.Vector.create(elements);
};

Sylvester.Vector.prototype = {
  e: function(i) {
    return (i < 1 || i > this.elements.length) ? null : this.elements[i-1];
  },

  dimensions: function() {
    return this.elements.length;
  },

  modulus: function(space) {
    space=space||Sylvester.Vector.Space;
    return space.norm(this.elements);
  },

  eql: function(vector) {
    var n = this.elements.length;
    var V = vector.elements || vector;
    if (n !== V.length) { return false; }
    while (n--) {
      if (Math.abs(this.elements[n] - V[n]) > Sylvester.precision) { return false; }
    }
    return true;
  },

  dup: function() {
    return Sylvester.Vector.create(this.elements);
  },

  map: function(fn, context) {
    return Sylvester.Vector.create(this.elements.map(fn,context));
  },

  forEach: function(fn, context) {
    this.elements.forEach(fn,context);
  },

  toUnitVector: function() {
    var r = this.modulus();
    if (r === 0) { return this.dup(); }
    return this.map(function(x) { return x/r; });
  },

  angleFrom: function(vector) {
    var V = vector.elements || vector;
    var n = this.elements.length, k = n, i;
    if (n !== V.length) { return null; }
    var dot = 0, mod1 = 0, mod2 = 0;
    // Work things out in parallel to save time
    this.each(function(x, i) {
      dot += x * V[i];
      mod1 += x * x;
      mod2 += V[i] * V[i];
    });
    mod1 = Math.sqrt(mod1); mod2 = Math.sqrt(mod2);
    if (mod1*mod2 === 0) { return null; }
    var theta = dot / (mod1*mod2);
    if (theta < -1) { theta = -1; }
    if (theta > 1) { theta = 1; }
    return Math.acos(theta);
  },
  
  oAngleFrom: function(vector) {
    if (this.elements.length !== vector.elements.length)return null;
    var a,b;
    if (this.elements.length == 2){
      a=this.to3D();
      b=vector.to3D();
    }else{
      a=this;
      b=vector;
    }
    var cross=a.cross(b);
    var dot=a.dot(b);
    var sign=1;
    cross.each(function(e){sign*=(e>=0?1:-1);});
    return sign*Math.atan2(a.cross(b).modulus(), a.dot(b));
  },

  isParallelTo: function(vector) {
    var angle = this.angleFrom(vector);
    return (angle === null) ? null : (angle <= Sylvester.precision);
  },

  isAntiparallelTo: function(vector) {
    var angle = this.angleFrom(vector);
    return (angle === null) ? null : (Math.abs(angle - Math.PI) <= Sylvester.precision);
  },

  isPerpendicularTo: function(vector) {
    var dot = this.dot(vector);
    return (dot === null) ? null : (Math.abs(dot) <= Sylvester.precision);
  },

  add: function(vector) {
    var V = vector.elements || vector;
    if (this.elements.length !== V.length) { return null; }
    return this.map(function(x, i) { return x + V[i]; });
  },

  subtract: function(vector) {
    var V = vector.elements || vector;
    if (this.elements.length !== V.length) { return null; }
    return this.map(function(x, i) { return x - V[i]; });
  },

  multiply: function(k) {
    return this.map(function(x) { return x*k; });
  },

  dot: function(vector,space) {
    space=space||Sylvester.Vector.Space;
    var V = vector.elements || vector;
    return space.dot(this.elements,V);
  },
  
  wedge: function(vector) {
    var B = vector.elements || vector;
    if (this.elements.length !== 2 || B.length !== 2) { return null; }
    var A = this.elements;
    return (A[0] * B[1]) - (A[1] * B[0]);
  },

  cross: function(vector) {
    var B = vector.elements || vector;
    if (this.elements.length !== 3 || B.length !== 3) { return null; }
    var A = this.elements;
    return Sylvester.Vector.create([
      (A[1] * B[2]) - (A[2] * B[1]),
      (A[2] * B[0]) - (A[0] * B[2]),
      (A[0] * B[1]) - (A[1] * B[0])
    ]);
  },

  max: function() {
    var m = 0, i = this.elements.length;
    while (i--) {
      if (Math.abs(this.elements[i]) > Math.abs(m)) { m = this.elements[i]; }
    }
    return m;
  },

  indexOf: function(x) {
    var index = null, n = this.elements.length;
    for (var i = 0; i < n; i++) {
      if (index === null && this.elements[i] === x) {
        index = i + 1;
      }
    }
    return index;
  },

  toDiagonalMatrix: function() {
    return Sylvester.Matrix.Diagonal(this.elements);
  },

  round: function() {
    return this.map(function(x) { return Math.round(x); });
  },

  snapTo: function(x) {
    return this.map(function(y) {
      return (Math.abs(y - x) <= Sylvester.precision) ? x : y;
    });
  },

  distanceFrom: function(obj,space) {
    if (obj.anchor || (obj.start && obj.end)) { return obj.distanceFrom(this); }
    var V = obj.elements || obj;
    if (V.length !== this.elements.length) { return null; }
    space=space||Sylvester.Vector.Space;
    return space.metric(V,this.elements);
  },

  liesOn: function(line) {
    return line.contains(this);
  },

  liesIn: function(plane) {
    return plane.contains(this);
  },

  rotate: function(t, obj) {
    obj=obj||Sylvester.Vector.Origin;
    var V, R = null, x, y, z;
    if (t.determinant) { R = t.elements; }
    switch (this.elements.length) {
      case 2:
        V = obj.elements || obj;
        if (V.length !== 2) { return null; }
        if (!R) { R = Sylvester.Matrix.Rotation(t).elements; }
        x = this.elements[0] - V[0];
        y = this.elements[1] - V[1];
        return Sylvester.Vector.create([
          V[0] + R[0][0] * x + R[0][1] * y,
          V[1] + R[1][0] * x + R[1][1] * y
        ]);
        break;
      case 3:
        if (!obj.direction) { return null; }
        var C = obj.pointClosestTo(this).elements;
        if (!R) { R = Sylvester.Matrix.Rotation(t, obj.direction).elements; }
        x = this.elements[0] - C[0];
        y = this.elements[1] - C[1];
        z = this.elements[2] - C[2];
        return Sylvester.Vector.create([
          C[0] + R[0][0] * x + R[0][1] * y + R[0][2] * z,
          C[1] + R[1][0] * x + R[1][1] * y + R[1][2] * z,
          C[2] + R[2][0] * x + R[2][1] * y + R[2][2] * z
        ]);
        break;
      default:
        return null;
    }
  },

  reflectionIn: function(obj) {
    if (obj.anchor) {
      // obj is a plane or line
      var P = this.elements.slice();
      var C = obj.pointClosestTo(P).elements;
      return Sylvester.Vector.create([C[0] + (C[0] - P[0]), C[1] + (C[1] - P[1]), C[2] + (C[2] - (P[2] || 0))]);
    } else {
      // obj is a point
      var Q = obj.elements || obj;
      if (this.elements.length !== Q.length) { return null; }
      return this.map(function(x, i) { return Q[i] + (Q[i] - x); });
    }
  },

  to3D: function() {
    var V = this.dup();
    switch (V.elements.length) {
      case 3: break;
      case 2: V.elements.push(0); break;
      default: return null;
    }
    return V;
  },

  inspect: function() {
    return '[' + this.elements.join(', ') + ']';
  },

  setElements: function(els) {
    this.elements = (els.elements || els).slice();
    return this;
  }
};

Sylvester.Vector.prototype.x = Sylvester.Vector.prototype.multiply;
Sylvester.Vector.prototype.each = Sylvester.Vector.prototype.forEach;

Sylvester.Vector.i = Sylvester.Vector.create([1,0,0]);
Sylvester.Vector.j = Sylvester.Vector.create([0,1,0]);
Sylvester.Vector.k = Sylvester.Vector.create([0,0,1]);
Sylvester.Vector.Origin = Sylvester.Vector.Zero();
Sylvester.Vector.Space=new Sylvester.Spaces.Eucledian();