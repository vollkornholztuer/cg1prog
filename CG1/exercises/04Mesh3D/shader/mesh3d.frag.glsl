#version 300 es
precision highp float;

in vec3 v_color;

out vec4 fragColor;

uniform vec3 u_color;

void main() {
	// fragColor = vec4(v_color.xyz, 1.0);

	float red = 0.0;
	float green = 0.0;
	float blue = 0.0;

	//Lab04, 1 (c) 
	fragColor = vec4(v_color.rgb, 1.0);
}
