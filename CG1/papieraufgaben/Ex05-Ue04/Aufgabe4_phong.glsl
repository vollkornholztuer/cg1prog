// Vertex Shader

layout(loctaion = 0) in vec3 a_position;
layout(loctaion = 1) in vec3 a_normal;
vec3 lighting(vec3 n, vec3 l, vec3 v) {
    /* */
}
uniform mat4 u_mv;
uniform mat4 u_mvp;

out vec3 position;

void main() {
    position = (inverse(transspose(u_mv)) * vec4(normal.1.0));
    position = (u_mv * vec4(a_position, 1.0)).xyz;
    gl_Posiiton = u_mvp * vec4(a_position, 1.0);
}

// Fragment shader
out vec4 fragColor;
vec3 lighting(vec3 n, vec3 l, vec3 v) {/* */
}
in vec3 position;
void main() {
    vec3 color = lighting(norma, vec3(0, 0, 0), viewvector);

    fragColor = vec4(color, 1.0);
}