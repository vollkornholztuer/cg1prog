#version 300 es
precision highp float;

// Lab 02, Aufgabe 2
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 inColor;
// Lab 05, 1b
layout(location = 2) in vec3 a_normal;

// Lab 05, 1c
out vec3 fs_color;

// Lab 05, 1d
out vec3 fs_normal;

out vec3 v_color;

// Lab 02, Aufgabe 3(b)
uniform mat4 mat4_transform;

void main() {
    // gl_Position = vec4(a_position.xyz, 1);
    // gl_Position = vec4(mat3_transform * vec3(a_position.xy, 1), 1.0); // 02/03 Mesh2D/Wireframe

    // Lab04, 1(a)
    gl_Position = mat4_transform * vec4(a_position.xyz, 1.0); //xyz, da 3D (3er Matrix)
    v_color = abs(a_position);
    fs_color = abs(a_normal);
    fs_normal = a_normal;
}