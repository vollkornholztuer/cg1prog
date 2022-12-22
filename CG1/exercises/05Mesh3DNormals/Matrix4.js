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
        return [1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
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
        return [1, 0,               0,                  0,
                0, Math.cos(angle), -Math.sin(angle),   0,
                0, Math.sin(angle), Math.cos(angle),    0,
                0, 0,               0,                  1];

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
        return [Math.cos(angle), 0, -Math.sin(angle),   0,
                0,               1, 0,                  0,
                Math.sin(angle), 0, Math.cos(angle),    0,
                0,               0, 0,                  1];

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
        return [Math.cos(angle),-Math.sin(angle), 0, 0,
                Math.sin(angle), Math.cos(angle), 0, 0,
                0,               0,               1, 0,
                0,               0,               0, 1];

    },

    /**
     * Creates and returns the matrix-matrix product of two 4x4 row-major matrices.
     * @param {number[]} a A row-major 4x4 matrix as left-operand of the matrix product.
     * @param {number[]} b A row-major 4x4 matrix as right-operand of the matrix product.
     * @returns The matrix-matrix product of two 4x4 row-major matrices.
     */
    multiply: function (a, b) {
        // Lab 04, 1(d)
        // http://www.c-jump.com/bcc/common/Talk3/Math/Matrices/W01_0150_matrix_by_matrix_mult.htm
        let c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15;
        c0 = a[0]*b[0] + a[1]*b[4] + a[2]*b[8] + a[3]*b[12];
        c1 = a[0]*b[1] + a[1]*b[5] + a[2]*b[9] + a[3]*b[13];
        c2 = a[0]*b[2] + a[1]*b[6] + a[2]*b[10] + a[3]*b[14];
        c3 = a[0]*b[3] + a[1]*b[7] + a[2]*b[11] + a[3]*b[15];

        c4 = a[4]*b[0] + a[5]*b[4] + a[6]*b[8] + a[7]*b[12];
        c5 = a[4]*b[1] + a[5]*b[5] + a[6]*b[9] + a[7]*b[13];
        c6 = a[4]*b[2] + a[5]*b[6] + a[6]*b[10] + a[7]*b[14];
        c7 = a[4]*b[3] + a[5]*b[7] + a[6]*b[11] + a[7]*b[15];

        c8 = a[8]*b[0] + a[9]*b[4] + a[10]*b[8] + a[11]*b[12];
        c9 = a[8]*b[1] + a[9]*b[5] + a[10]*b[9] + a[11]*b[13];
        c10 = a[8]*b[2] + a[9]*b[6] + a[10]*b[10] + a[11]*b[14];
        c11 = a[8]*b[3] + a[9]*b[7] + a[10]*b[11] + a[11]*b[15];

        c12 = a[12]*b[0] + a[13]*b[4] + a[14]*b[8] + a[15]*b[12];
        c13 = a[12]*b[1] + a[13]*b[5] + a[14]*b[9] + a[15]*b[13];
        c14 = a[12]*b[2] + a[13]*b[6] + a[14]*b[10] + a[15]*b[14];
        c15 = a[12]*b[3] + a[13]*b[7] + a[14]*b[11] + a[15]*b[15];

        return [c0,  c1,  c2,  c3,
                c4,  c5,  c6,  c7,
                c8,  c9,  c10, c11,
                c12, c13, c14, c15];
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
        // Foliensatz 06viewing.pdf - Folie 59, Matrix ganz rechts
        return [1/(aspectRatio * Math.tan(fieldOfViewRadians/2)), 0,                                  0,                                                                             0,
                0,                                                1/(Math.tan(fieldOfViewRadians/2)), 0,                                                                             0,
                0,                                                0,                                  (nearPlaneDistance + farPlaneDistance)/(nearPlaneDistance - farPlaneDistance), (2* farPlaneDistance*nearPlaneDistance)/(nearPlaneDistance-farPlaneDistance),
                0,                                                0,                                  -1,                                                                            0
                ];
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