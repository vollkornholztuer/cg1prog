export let Matrix3 = {

    // Creates a 3x3 row-major translation matrix, that translates 2D homogeneous points by tx in x direction and ty in y direction.
    translation: function (tx, ty) {
        // Lab 02, Aufgabe 3(a)
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
    },

    // Creates a 3x3 row-major rotation matrix, that rotates 2D homogeneous points anti-clockwise.
    rotation: function (angleInRadians) {
        // Lab 02, Aufgabe 3(a)
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
    },

    // Creates a 3x3 row-major scale matrix, that scales 2D homogeneous points by sx in x and by sy in y direction.
    scaling: function (sx, sy) {
        // Lab 02, Aufgabe 3(a)
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
    },

    // Returns the product of two 3x3 matrices.
    multiply: function (a, b) {
        // Lab 03, Aufgabe 3(a)
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];

    },

    // Creates a 3x3 homogeneous matrix that scales a [-1;1]x[-1;1] coordinate frame such that no skewing happens when mapping to a [0;w-1]x[0;h-1] pixel grid
    // w, h are the width and height of the pixel grid, respectively.
    aspect: function (w, h)
    {
        // Lab 02, Aufgabe 3(c)
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];

    }
};