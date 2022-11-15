#version 300 es
precision highp float;

// Lab 02, Aufgabe 2

in vec3 v_color;

out vec4 fragColor;

uniform vec3 u_color;

void main()
{
	// Lab 02, Aufgabe 2
	fragColor = vec4(v_color.rgb, 1.0);
}