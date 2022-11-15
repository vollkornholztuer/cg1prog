#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;


// Lab 02, Aufgabe 2
layout(location= 1) in vec3 a_color;
out vec3 v_color;
// Lab 02, Aufgabe 3(b)
uniform mat3 mat3_transform;

void main()
{
    // Lab 02, Aufgabe 3(b)
    //gl_Position = vec4(a_position.xyz, 1);
    gl_Position = vec4(mat3_transform*vec3(a_position.xy, 1), 1.0);
    // Lab 02, Aufgabe 2
    v_color = a_color;

    
}