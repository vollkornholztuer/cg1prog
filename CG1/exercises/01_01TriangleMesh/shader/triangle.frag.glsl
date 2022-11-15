#version 300 es
precision highp float;

in vec3 v_color;

out vec4 outColor;

uniform vec3 u_color;

void main() 
{
  // outColor = vec4(v_color.rgb, 1.0);
  outColor = vec4(v_color.rgb*2.0, 1.0);
  // outColor = vec4(v_color.rgb*2.0+vec3(0,0,1), 1.0);
}