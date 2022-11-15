import { GLSLRuntimeError } from "../error/glsl-runtime-error.js";
import { setReadOnlyProperty } from "../helper/object.js";

const SHADER_TYPES = [
  WebGL2RenderingContext.VERTEX_SHADER,
  WebGL2RenderingContext.FRAGMENT_SHADER,
];

export default class Shader {
  constructor(gl, src, type) {
    this.handle = null;
    this.gl = null;
    this.type = null;

    setReadOnlyProperty(this, "gl", this.gl);
    setReadOnlyProperty(this, "type", this.type);

    if (!Shader.isShaderTypeValid(type)) {
      throw new GLSLRuntimeError("Unknown Shader Type");
    }

    if (!src) {
      throw new GLSLRuntimeError("No Source has been given");
    }

    {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);

      setReadOnlyProperty(this, "handle", shader);
    }
  }

  compileShader() {
    // There will be no error check due to best practice
    // of just checking after linking
    // see: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices#dont_check_shader_compile_status_unless_linking_fails
    this.gl.compileShader(this.handle);
  }

  deleteShader() {
    this.gl.deleteShader(this.handle);
    delete this;
  }

  static isShaderTypeValid(type) {
    return (
      SHADER_TYPES.findIndex((t) => {
        return t === type;
      }) !== -1
    );
  }
}
