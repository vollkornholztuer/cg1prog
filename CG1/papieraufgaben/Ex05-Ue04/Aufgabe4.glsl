// Vertex Shader

layout(loctaion = 0) in vec3 a_position;
layout(loctaion = 1) in vec3 a_normal;
vec3 lighting(vec3 n, vec3 l, vec3 v) {
    /* */
}
out vec3 color;
uniform mat4 u_mvp;

void main() {
    vec3 color = lighting(a_normal, vec3(0, 0, 0), a_position);
    gl_Posiiton = u_mvp * vec4(a_position, 1.0);
}

// Fragment shader
in vec3 color;
out vec4 fragColor;
vec3 lighting(vec3 n, vec3 l, vec3 v) {

}

void main() {
    fragColor = vec4(color, 1.0);
}