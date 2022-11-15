#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;

// Lab 02, Aufgabe 2
// Lab 02, Aufgabe 3(b)

void main()
{
    // Lab 02, Aufgabe 3(b)
    gl_Position = vec4(a_position.xyz, 1);
    // Lab 02, Aufgabe 2
    
}