#version 300 es
layout (location = 0) in vec4 inVertex;
layout (location = 1) in vec3 inColor;

uniform float u_scale;

out vec3 v_color;
void main() 
{
  gl_Position = vec4(u_scale * inVertex.xyz, inVertex.w);
  v_color = inColor;
  // v_color = abs(inVertex.xyz);
}