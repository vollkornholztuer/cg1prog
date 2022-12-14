#version 300 es
precision highp float;

// Model-color
in vec3 v_color;
out vec4 fragColor;

// Wireframe Color
uniform bool u_useWireframe;
uniform vec3 u_wfColor;

// Normals
in vec3 fs_color;

uniform vec3 u_color;

void main() {
	// fragColor = vec4(v_color.xyz, 1.0);

	if(u_useWireframe) {
		fragColor = vec4(u_wfColor.rgb, 1.0);

	} else {
		//Lab04, 1 (c) 
		fragColor = vec4(v_color.rgb, 1.0);
	}

}
