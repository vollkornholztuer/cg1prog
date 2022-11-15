// @ts-check
export let Matrix4 = {
    /**
     * Creates and returns a 4x4 row-major translation matrix. 
     * A translation-matrix multiplied with a 3D homogeneous point translates that point by 
     * tx in x direction, ty in y direction, and tz in z direction.
     * @param {number} tx Translation in x direction.
     * @param {number} ty Translation in y direction.
     * @param {number} tz Translation in y direction.
     * @returns A 4x4 row-major translation matrix.
     */
    translation: function (tx, ty, tz) {
        // Lab 04, 1(d)
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
},

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the x axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} angle for rotation in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationX: function (angle) {
        // Lab 04, 1(d)
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];

    },

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the y axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} angle for rotation in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationY: function (angle) {
        // Lab 04, 1(d)
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];

    },

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the z axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} angle for rotation in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationZ: function (angle) {
        // Lab 04, 1(d)
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];

    },

    /**
     * Creates and returns the matrix-matrix product of two 4x4 row-major matrices.
     * @param {number[]} a A row-major 4x4 matrix as left-operand of the matrix product.
     * @param {number[]} b A row-major 4x4 matrix as right-operand of the matrix product.
     * @returns The matrix-matrix product of two 4x4 row-major matrices.
     */
    multiply: function (a, b) {
        // Lab 04, 1(d)
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
    },

    /**
     * Creates 4x4 perspective projection matrix.
     * @param {number} fieldOfViewRadians Field of view in y direction provided in radians.
     * @param {number} aspectRatio Aspect ratio of view plane, i.e., width / height.
     * @param {number} nearPlaneDistance Distance from near plane to camera origin.
     * @param {number} farPlaneDistance  Distance from far plane to camera origin.
     */
    perspective: function (fieldOfViewRadians, aspectRatio, nearPlaneDistance, farPlaneDistance) {
        // Lab 04, 1(d)
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
    },

    
    /**
     * Returns the transpose of a matrix.
     * @param {number[]} a The input matrix.
     * @returns The transpose
     */
     transpose: function (a) {
        // Lab 05, 2(d)
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
        
    }

};