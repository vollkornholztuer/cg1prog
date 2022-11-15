export let Matrix3 = {

    // Creates a 3x3 row-major translation matrix, that translates 2D homogeneous points by tx in x direction and ty in y direction.
    translation: function (tx, ty) {
        // Lab 02, Aufgabe 3(a)
        return [
            1, 0, tx,
            0, 1, ty,
            0, 0, 1,
        ];
    },

    // Creates a 3x3 row-major rotation matrix, that rotates 2D homogeneous points anti-clockwise.
    rotation: function (angleInRadians) {
        // Lab 02, Aufgabe 3(a)
        return [
            Math.cos(angleInRadians), -Math.sin(angleInRadians), 0,
            Math.sin(angleInRadians), Math.cos(angleInRadians),  0,
            0,                        0,                         1,
        ];
    },

    // Creates a 3x3 row-major scale matrix, that scales 2D homogeneous points by sx in x and by sy in y direction.
    scaling: function (sx, sy) {
        // Lab 02, Aufgabe 3(a)
        return [
            sx, 0,  0,
            0,  sy, 0,
            0,  0,  1,
        ];
    },

    // Returns the product of two 3x3 matrices.
    multiply: function (a, b) {
        // Lab 03, Aufgabe 3(a)

        var c0, c1, c2, c3, c4, c5, c6, c7, c8
        c0 = a[0]*b[0] + a[1]*b[3] + a[2]*b[6],     c1 = a[0]*b[1] + a[1]*b[4] + a[2]*b[7],     c2 = a[0]*b[2] + a[1]*b[5] + a[2]*b[8],
        c3 = a[3]*b[0] + a[4]*b[3] + a[5]*b[6],     c4 = a[3]*b[1] + a[4]*b[4] + a[5]*b[7],     c5 = a[3]*b[2] + a[4]*b[5] + a[5]*b[8],
        c6 = a[6]*b[0] + a[7]*b[3] + a[8]*b[6],     c7 = a[6]*b[1] + a[7]*b[4] + a[8]*b[7],     c8 = a[6]*b[2] + a[7]*b[5] + a[8]*b[8];

        return [
            c0, c1, c2,
            c3, c4, c5,
            c6, c7, c8
        ];

    },

    // Creates a 3x3 homogeneous matrix that scales a [-1;1]x[-1;1] coordinate frame such that no skewing happens when mapping to a [0;w-1]x[0;h-1] pixel grid
    // w, h are the width and height of the pixel grid, respectively.
    aspect: function (w, h)
    {
        // Lab 02, Aufgabe 3(c)
        const sw = w > h ? h/w : 1;
        const sh = h > w ? w/h : 1;

        return [
            sw, 0, 0,
            0, sh, 0,
            0, 0, 1,
        ];

    }
};