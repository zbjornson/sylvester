declare module Sylvester {
    const precision: number;

    class Vector {
        /**
         * Factory method.
         */
        static create(elements: Vector|Array<number>): Vector;

        static i: Vector;
        static j: Vector;
        static k: Vector;

        /**
         * Random vector of size n.
         *
         * @param n The vector size.
         */
        static Random(n: number): Vector;

        /**
         * Vector filled with zeros.
         *
         * @param n The vector size.
         */
        static Zero(n: number): Vector;

        /**
         * Array containing the vector's elements.
         */
        elements: Array<number>;

        /**
         * Returns element i of the vector.
         */
        e(i: number): number;

        /**
         * Returns the number of elements the vector has.
         */
        dimensions(): number;

        /**
         * Returns the modulus ('length') of the vector.
         */
        modulus(): number;

        /**
         * Returns true if the vector is equal to the argument.
         *
         * @param vector The vector to compare equality.
         */
        eql(vector: Vector|Array<number>): boolean;

        /**
         * Returns a copy of the vector.
         */
        dup(): Vector;

        /**
         * Maps the vector to another vector according to the given function.
         *
         * @param fn The function to apply to each element (x, i) => {}.
         */
        map(fn: (x: number, i: number) => any): Vector;

        /**
         * Calls the iterator for each element of the vector in turn.
         *
         * @param fn The function to apply to each element (x, i) => {}.
         */
        forEach(fn: (x: number, i: number) => any): void;

        /**
         * Calls the iterator for each element of the vector in turn.
         * Alias for forEach
         *
         * @param fn The function to apply to each element (x, i) => {}.
         */
        each(fn: (x: number, i: number) => any): void;

        /**
         * Returns a new vector created by normalizing the receiver.
         */
        toUnitVector(): Vector;

        /**
         * Returns the angle between the vector and the argument (also a vector).
         *
         * @param vector The other vector to calculate the angle.
         */
        angleFrom(vector: Vector): number;

        /**
         * Returns true if the vector is parallel to the argument.
         *
         * @param vector The other vector.
         */
        isParallelTo(vector: Vector): boolean;

        /**
         * Returns true if the vector is antiparallel to the argument.
         *
         * @param vector The other vector.
         */
        isAntiparallelTo(vector: Vector): boolean;

        /**
         * Returns true iff the vector is perpendicular to the argument.
         *
         * @param vector The other vector.
         */
        isPerpendicularTo(vector: Vector): boolean;

        /**
         * Returns the result of adding the argument to the vector.
         *
         * @param vector The vector.
         */
        add(vector: Vector|Array<number>): Vector;

        /**
         * Returns the result of subtracting the argument from the vector.
         *
         * @param vector The vector.
         */
        subtract(vector: Vector|Array<number>): Vector;

        /**
         * Returns the result of multiplying the elements of the vector by the argument.
         *
         * @param k The value by which to multiply the vector.
         */
        multiply(k: number): Vector;

        /**
         * Returns the result of multiplying the elements of the vector by the argument.
         * Alias for multiply.
         *
         * @param k The value by which to multiply the vector.
         */
        x(k: number): Vector;

        /**
         * Returns the result of multiplying the elements of the vector by the other vector.
         *
         * @param v The other vector by which to multiply the vector.
         */
        pairwiseMultiply(v: Vector): Vector;

        /**
         * Returns the result of dividing the elements of the vector by the other vector.
         *
         * @param v The other vector by which to divide the vector.
         */
        pairwiseDivide(v: Vector): Vector;

        /**
         * Returns the scalar product of the vector with the argument. Both vectors must have equal dimensionality.
         *
         * @param: vector The other vector.
         */
        dot(vector: Vector|Array<number>): number;

        /**
         * Returns the vector product of the vector with the argument. Both vectors must have dimensionality 3.
         *
         * @param vector The other vector.
         */
        cross(vector: Vector|Array<number>): Vector;

        /**
         * Sums the elements in the vector.
         */
        sum(): number;

        /**
         * Returns the (absolute) largest element of the vector.
         */
        max(): number;

        /**
         * Returns the index of the first match found.
         *
         * @param x The value.
         */
        indexOf(x: number): number;

        /**
         * Returns a diagonal matrix with the vector's elements as its diagonal elements.
         */
        toDiagonalMatrix(): Matrix;

        /**
         * Returns the result of rounding the elements of the vector.
         */
        round(): Vector;

        /**
         * Returns a copy of the vector with elements set to the given value if they differ from
         * it by less than Sylvester.precision.
         *
         * @param x The value to snap to.
         */
        snapTo(x: number): Vector;

        /**
         * Returns the vector's distance from the argument, when considered as a point in space.
         *
         * @param obj The object to calculate the distance.
         */
        distanceFrom(obj: Vector|Line|Plane): number;

        /**
         * Returns true if the vector is point on the given line.
         *
         * @param line The line.
         */
        liesOn(line: Line): boolean;

        /**
         * Return true if the vector is a point in the given plane.
         *
         * @param {Plane} plane The plane.
         */
        liesIn(plane: Plane): boolean;

        /**
         * Rotates the vector about the given object. The object should be a point if the vector is 2D,
         * and a line if it is 3D. Be careful with line directions!
         *
         * @param t The angle in radians.
         * @param obj The rotation axis.
         */
        rotate(t: number, obj: Vector|Line): Vector;

        /**
         * Returns the result of reflecting the point in the given point, line or plane.
         *
         * @param obj The object.
         */
        reflectionIn(obj: Vector|Line|Plane): Vector;

        /**
         * Utility to make sure vectors are 3D. If they are 2D, a zero z-component is added.
         */
        to3D(): Vector;

        /**
         * Returns a string representation of the vector.
         */
        inspect(): string;

        /**
         * Set vector's elements from an array.
         *
         * @param els The elements.
         */
        setElements(els: Vector|Array<number>): Vector;
    }

    class Matrix {
        /**
         * Factory method.
         *
         * @param elements The elements.
         */
        static create(elements: Array<number>|Array<Array<number>>|Vector | Matrix): Matrix;

        /**
         * Identity matrix of size n.
         *
         * @param n The size.
         */
        static I(n: number): Matrix;

        /**
         * Diagonal matrix - all off-diagonal elements are zero
         *
         * @param elements The elements.
         */
        static Diagonal(elements: Array<number>|Array<Array<number>>|Vector | Matrix): Matrix;

        /**
         * Rotation matrix about some axis. If no axis is supplied, assume we're after a 2D transform.
         *
         * @param theta The angle in radians.
         * @param a The axis.
         */
        static Rotation(theta: number, a?: Vector): Matrix;

        static RotationX(t: number): Matrix;
        static RotationY(t: number): Matrix;
        static RotationZ(t: number): Matrix;

        /**
         * Random matrix of n rows, m columns.
         *
         * @param n The number of rows.
         * @param m The number of columns.
         */
        static Random(n: number, m: number): Matrix;

        /**
         * Matrix filled with zeros.
         *
         * @param n The number of rows.
         * @param m The number of columns.
         */
        static Zero(n: number, m: number): Matrix;

        /**
         * A nested array containing the matrix's elements.
         */
        elements: Array<Array<number>>;

        /**
         * Returns element (i,j) of the matrix.
         *
         * @param i The row index.
         * @param j The column index.
         */
        e(i: number, j: number): any;

        /**
         * Returns row k of the matrix as a vector.
         *
         * @param i The row index.
         */
        row(i: number): Vector;

        /**
         * Returns column k of the matrix as a vector.
         *
         * @param j The column index.
         */
        col(j: number): Vector;

        /**
         * Returns the number of rows/columns the matrix has.
         *
         * @return An object { rows: , cols: }.
         */
        dimensions(): any;

        /**
         * Returns the number of rows in the matrix.
         */
        rows(): number;

        /**
         * Returns the number of columns in the matrix.
         */
        cols(): number;

        /**
         * Returns true if the matrix is equal to the argument. You can supply a vector as the argument,
         * in which case the receiver must be a one-column matrix equal to the vector.
         *
         * @param matrix The argument to compare.
         */
        eql(matrix: Vector|Matrix): boolean;

        /**
         * Returns a copy of the matrix.
         */
        dup(): Matrix;

        /**
         * Maps the matrix to another matrix (of the same dimensions) according to the given function.
         *
         * @param fn The function.
         */
        map(fn: (x: number, i: number, j: number) => any): Matrix;

        /**
         * Returns true iff the argument has the same dimensions as the matrix.
         *
         * @param matrix The other matrix.
         */
        isSameSizeAs(matrix: Matrix): boolean;

        /**
         * Returns the result of adding the argument to the matrix.
         *
         * @param matrix The matrix to add.
         */
        add(matrix: Matrix): Matrix;

        /**
         * Returns the result of subtracting the argument from the matrix.
         *
         * @param matrix The matrix to substract.
         */
        subtract(matrix: Matrix): Matrix;

        /**
         * Returns true iff the matrix can multiply the argument from the left.
         *
         * @param matrix The matrix.
         */
        canMultiplyFromLeft(matrix: Matrix): boolean;

        /**
         * Returns the result of multiplying the matrix from the right by the argument. If the argument is a scalar
         * then just multiply all the elements. If the argument is a vector, a vector is returned, which saves you
         * having to remember calling col(1) on the result.
         *
         * @param matrix The multiplier.
         */
        multiply(matrix: number|Matrix|Vector): Matrix;

        /**
         * Returns the result of multiplying the matrix from the right by the argument. If the argument is a scalar
         * then just multiply all the elements. If the argument is a vector, a vector is returned, which saves you
         * having to remember calling col(1) on the result.
         * Alias for multiply.
         *
         * @param matrix The multiplier.
         */
        x(matrix: number|Matrix|Vector): Matrix;

        /**
         * Returns the result of multiplying the matrix by another matrix.
         *
         * @param matrix The other matrix.
         * @return null if matrix is not the same size.
         */
        pairwiseMultiply(matrix: Matrix): Matrix;

        /**
         * Returns a submatrix taken from the matrix. Argument order is: start row, start col, nrows, ncols.
         * Element selection wraps if the required index is outside the matrix's bounds, so you could use
         * this to perform row/column cycling or copy-augmenting.
         *
         * @param a Starting row index.
         * @param b Starting column index.
         * @param c Number of rows.
         * @param d Number of columns.
         */
        minor(a: number, b: number, c: number, d: number): Matrix;

        /**
         * Returns the transpose of the matrix.
         */
        transpose(): Matrix;

        /**
         * Returns true if the matrix is square.
         */
        isSquare(): boolean;

        /**
         * Returns the (absolute) largest element of the matrix.
         */
        max(): number;

        /**
         * Returns the indeces of the first match found by reading row-by-row from left to right.
         *
         * @param x The value.
         *
         * @return The element indeces i.e: { row:1, col:1 }
         */
        indexOf(x: number): any;

        /**
         * If the matrix is square, returns the diagonal elements as a vector; otherwise, returns null.
         */
        diagonal(): Vector;

        /**
         * Make the matrix upper (right) triangular by Gaussian elimination. This method only adds multiples
         * of rows to other rows. No rows are scaled up or switched, and the determinant is preserved.
         */
        toRightTriangular(): Matrix;

        /**
         * Make the matrix upper (right) triangular by Gaussian elimination. This method only adds multiples
         * of rows to other rows. No rows are scaled up or switched, and the determinant is preserved.
         * Alias for toRightTriangular
         */
        toUppserTriangular(): Matrix;

        /**
         * Returns the determinant for square matrices.
         */
        determinant(): number;

        /**
         * Returns the determinant for square matrices.
         * Alias for determinant.
         */
        det(): number;

        /**
         * Returns true if the matrix is singular.
         */
        isSingular(): boolean;

        /**
         * Returns the trace for square matrices.
         */
        trace(): number;

        /**
         * Returns the trace for square matrices.
         * Alias for trace.
         */
        tr(): number;

        /**
         * Returns the rank of the matrix.
         */
        rank(): number;

        /**
         * Returns the rank of the matrix.
         * Alias for rank.
         */
        rk(): number;

        /**
         * Returns the result of attaching the given argument to the right-hand side of the matrix.
         *
         * @param matrix The matrix or vector.
         */
        augment(matrix: Matrix|Vector): Matrix;

        /**
         * Returns the inverse (if one exists) using Gauss-Jordan.
         */
        inverse(): Matrix;

        /**
         * Returns the inverse (if one exists) using Gauss-Jordan.
         * Alias for inverse.
         */
        inv(): Matrix;

        /**
         * Returns the result of rounding all the elements.
         */
        round(): Matrix;

        /**
         * Returns a copy of the matrix with elements set to the given value if they differ from it
         * by less than Sylvester.precision.
         *
         * @param x The value.
         */
        snapTo(x: number): Matrix;

        /**
         * Sums all the elements in the matrix.
         */
        sum(): number;

        /**
         * Returns a string representation of the matrix.
         */
        inspect(): string;

        /**
         * Set the matrix's elements from an array. If the argument passed is a vector, the resulting matrix
         * will be a single column.
         *
         * @param matrix The elements.
         */
        setElements(matrix: Array<number>|Array<Array<number>>|Vector|Matrix): Matrix;

        /**
         * Calculates the eigenvalues of the matrix.
         */
        eigenvalues(): Vector;

        /**
         * Calculates the eigenvectors for the matrix.
         * For 2x2 matrices only. Assumes real eigenvalue exist. Norms to absolute value 1.
         */
        eigenvectors(): Matrix|Vector;
    }

    class Line {
        /**
         * Factory method
         *
         * @param anchor The anchor vector.
         * @param direction The direction vector.
         */
        static create(anchor: Array<number>|Vector, direction: Array<number>|Vector): Line;

        static X: Line;
        static Y: Line;
        static Z: Line;

        /**
         * Gets the 3D vector corresponding to a point on the line.
         */
        anchor: Vector;

        /**
         * Gets a normalized 3D vector representing the line's direction.
         */
        direction: Vector;

        /**
         * Returns true if the argument occupies the same space as the line.
         *
         * @param line The other line.
         */
        eql(line: Line): boolean;

        /**
         * Returns a copy of the line.
         */
        dup(): Line;

        /**
         * Returns the result of translating the line by the given vector/array.
         *
         * @param vector The translation vector.
         */
        translate(vector: Vector|Array<number>): Line;

        /**
         * Returns true if the line is parallel to the argument. Here, 'parallel to' means that the argument's
         * direction is either parallel or antiparallel to the line's own direction. A line is parallel to a
         * plane if the two do not have a unique intersection.
         *
         * @param obj The object.
         */
        isParallelTo(obj: Line|Plane): boolean;

        /**
         * Returns the line's perpendicular distance from the argument, which can be a point, a line or a plane.
         *
         * @param obj The object.
         */
        distanceFrom(obj: Vector|Line|Plane): number;

        /**
         * Returns true if the argument is a point on the line.
         *
         * @param point The point.
         */
        contains(point: Vector): boolean;

        /**
         *
         */
        positionOf(point: Vector|[number, number]): number;

        /**
         * Returns true if the line lies in the given plane.
         *
         * @param plane The plane.
         */
        liesIn(plane: Plane): boolean;

        /**
         * Returns true if the line has a unique point of intersection with the argument.
         *
         * @param obj The object.
         */
        intersects(obj: Line|Plane): boolean;

        /**
         * Returns the unique intersection point with the argument, if one exists.
         *
         * @param obj The object.
         */
        intersectionWith(obj: Line|Plane): Vector;

        /**
         * Returns the point on the line that is closest to the given point or line.
         *
         * @param obj The object.
         */
        pointClosestTo(obj: Vector|Line): Vector;

        /**
         * Returns a copy of the line rotated by t radians about the given line. Works by finding the argument's
         * closest point to this line's anchor point (call this C) and rotating the anchor about C. Also rotates
         * the line's direction about the argument's. Be careful with this - the rotation axis' direction
         * affects the outcome!
         *
         * @param t The angle in radians.
         * @param axis The axis.
         */
        rotate(t: number, axis: Vector|Line): Line;

        /**
         * Reverses the direction of this line.
         */
        reverse(): Line;

        /**
         * Returns the line's reflection in the given point or line.
         *
         * @param obj The object.
         */
        reflectionIn(obj: Vector|Line|Plane): Line;

        /**
         * Set the line's anchor point and direction.
         *
         * @param anchor The anchor vector.
         * @param direction The direction vector.
         */
        setVectors(anchor: Array<number>|Vector, direction: Array<number>|Vector): Line;

        // TODO
        static Segment: { }
    }

    class Plane {
        /**
         * Constructor function.
         */
        static create(anchor: Array<number>|Vector, normal: Array<number>|Vector): Plane;

        /**
         * Constructor function.
         */
        static create(anchor: Array<number>|Vector, v1: Array<number>|Vector, v2: Array<number>|Vector): Plane;

        static fromPoints(points: [number, number][]): Plane;

        static XY: Plane;
        static YZ: Plane;
        static ZX: Plane;
        static YX: Plane;

        /**
         * Gets the 3D vector corresponding to a point in the plane.
         */
        static anchor: Vector;

        /**
         * Gets a normalized 3D vector perpendicular to the plane.
         */
        static normal: Vector;

        /**
         * Returns true if the plane occupies the same space as the argument.
         *
         * @param {Plane} plane The other plane.
         */
        eql(plane: Plane): boolean;

        /**
         * Returns a copy of the plane.
         */
        dup(): Plane;

        /**
         * Returns the result of translating the plane by the given vector.
         *
         * @param {Array<number>|Vector} vector The translation vector.
         */
        translate(vector: Array<number>|Vector): Plane;

        /**
         * Returns true if the plane is parallel to the argument. Will return true if the planes are equal,
         * or if you give a line and it lies in the plane.
         *
         * @param {Line|Plane} obj The object.
         */
        isParallelTo(obj: Line|Plane): boolean;

        /**
         * Returns true if the receiver is perpendicular to the argument.
         *
         * @param {Plane} plane The other plane.
         */
        isPerpendicularTo(plane: Plane): boolean;

        /**
         * Returns the plane's distance from the given object (point, line or plane).
         *
         * @parm {Vector|Line|Plane} obj The object.
         */
        distanceFrom(obj: Vector|Line|Plane): number;

        /**
         * Returns true if the plane contains the given point or line.
         *
         * @param {Vector|Line} obj The object.
         */
        contains(obj: Vector|Line): boolean;

        /**
         * Returns true if the plane has a unique point/line of intersection with the argument.
         *
         * @param {Line|Plane} obj The object.
         */
        intersects(obj: Line|Plane): boolean;

        /**
         * Returns the unique intersection with the argument, if one exists.
         *
         * @param {Line} line The line.
         */
        intersectionWith(line: Line): Vector;

        /**
         * Returns the unique intersection with the argument, if one exists.
         *
         * @param {Plane} plane The plane.
         */
        intersectionWith(plane: Plane): Line;

        /**
         * Returns the point in the plane closest to the given point.
         *
         * @param {Vector} point The point.
         */
        pointClosestTo(point: Vector): Vector;

        /**
         * Returns a copy of the plane, rotated by t radians about the given line. See notes on Line#rotate.
         *
         * @param {number} t The angle in radians.
         * @param {Line} axis The line axis.
         */
        rotate(t: number, axis: Line): Plane;

        /**
         * Returns the reflection of the plane in the given point, line or plane.
         *
         * @param {Vector|Line|Plane} obj The object.
         */
        reflectionIn(obj: Vector|Line|Plane): Plane;

        /**
         * Sets the anchor point and normal to the plane. Normal vector is normalised before storage.
         *
         * @param {Array<number>|Vector} anchor The anchor vector.
         * @param {Array<number>|Vector} normal The normal vector.
         */
        setVectors(anchor: Array<number>|Vector, normal: Array<number>|Vector): Plane;

        /**
         * Sets the anchor point and normal to the plane. The normal is calculated by assuming the three points
         * should lie in the same plane. Normal vector is normalised before storage.
         *
         * @param {Array<number>|Vector} anchor The anchor vector.
         * @param {Array<number>|Vector} v1 The first direction vector.
         * @param {Array<number>|Vector} v2 The second direction vector.
         */
        setVectors(anchor: Array<number>|Vector, v1: Array<number>|Vector, v2: Array<number>|Vector): Plane;
    }

    class Polygon {
        // TODO
    }
}

export = Sylvester;
