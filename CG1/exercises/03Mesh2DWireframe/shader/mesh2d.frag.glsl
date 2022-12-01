#version 300 es
precision highp float;

// Lab 02, Aufgabe 2 - Model-color
in vec3 v_color;
out vec4 fragColor;

// Lab 03 - Wireframe Color
uniform bool u_useWireframe;
uniform vec3 u_wfColor;

uniform vec3 u_color;

void main() {
	if(u_useWireframe) {
		fragColor = vec4(u_wfColor.rgb, 1.0);
	} else {
		// Lab 02, Aufgabe 2
		fragColor = vec4(v_color.rgb, 1.0);
	}

}