import Shader from "./shader.js";
import { glSafeCall } from "./webgl.js";
import { setReadOnlyProperty } from "./object.js";
import { NullArgumentError } from "../error/null-argument-error.js";
import { IllegalArgumentError } from "../error/illegal-argument-error.js";
import { GLSLRuntimeError } from "../error/glsl-runtime-error.js";

export default class GLSLProgram {
  constructor(canvas, vertexShaderSrc, fragmentShaderSrc) {
    this.gl = null;
    this.program = null;
    this.vertexShader = null;
    this.fragmentShader = null;

    if (!canvas) {
      throw new NullArgumentError("No canvas object has been given!");
    }

    setReadOnlyProperty(this, "gl", canvas.getContext("webgl2"));

    if (!this.gl) {
      throw new IllegalArgumentError("No valid canvas object has been given");
    }

    setReadOnlyProperty(
      this,
      "vertexShader",
      new Shader(this.gl, vertexShaderSrc, this.gl.VERTEX_SHADER)
    );
    setReadOnlyProperty(
      this,
      "fragmentShader",
      new Shader(this.gl, fragmentShaderSrc, this.gl.FRAGMENT_SHADER)
    );

    setReadOnlyProperty(
      this,
      "program",
      createProgram(
        this.gl,
        this.vertexShader.handle,
        this.fragmentShader.handle
      )
    );
  }

  getAttributeLocation(name) {
    return glSafeCall(this.gl, this.gl.getAttribLocation, this.program, name);
  }

  getUniformLocation(name) {
    return glSafeCall(this.gl, this.gl.getUniformLocation, this.program, name);
  }

  use() {
    return glSafeCall(this.gl, this.gl.useProgram, this.program);
  }
}

function createProgram(gl, vertexShaderHandle, fragmentShaderHandle) {
  const program = glSafeCall(gl, gl.createProgram);

  gl.attachShader(program, vertexShaderHandle);
  gl.attachShader(program, fragmentShaderHandle);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const programInfo = gl.getProgramInfoLog(program);
    const vertexShaderInfo = gl.getShaderInfoLog(vertexShaderHandle);
    const fragmentShaderInfo = gl.getShaderInfoLog(fragmentShaderHandle);

    console.log(`
    Error while creating glsl program. \n
    Program Log: ${programInfo} \n
    VertexShader Log: ${vertexShaderInfo} \n
    FragmentShader Log: ${fragmentShaderInfo}
  `)
    gl.deleteProgram(program);
    throw new GLSLRuntimeError(`
      Error while creating glsl program. \n
      Program Log: ${programInfo} \n
      VertexShader Log: ${vertexShaderInfo} \n
      FragmentShader Log: ${fragmentShaderInfo}
    `);

  }

  return program;
}
