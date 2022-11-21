#version 300 es
precision highp float;

in vec3 v_color;

out vec4 fragColor;

uniform vec3 u_color;

void main() {
	// fragColor = vec4(v_color.xyz, 1.0);

	float red = v_color.x;
	float green = v_color.y;
	float blue = v_color.z;

	//Lab04, 1 (b) 
	if(red < 0.001 && green < 0.001 && blue < 0.001) {
		fragColor = vec4(0.0, 0.0, 0.0, 1.0);
	} else {
		fragColor = vec4(v_color.rgb, 1.0);
	}
}
