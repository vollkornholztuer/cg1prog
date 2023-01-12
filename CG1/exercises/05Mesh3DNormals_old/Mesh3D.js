import GLSLProgram from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL, loadBinaryDataStreamFromURL } from "./../../lib/helper/http.js";
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"
import { Matrix4 } from "./Matrix4.js";
import { TriangleMeshGL } from "./TriangleMeshGL.js"

function Mesh3DApp() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");

  let mGlslProgram = null;
  let triangleMeshGL = null;

  /***
   * Run once one startup.
   */
  async function setup() {
    // load shader
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(mCanvas, await loadDataFromURL(vertexShaderUrl), await loadDataFromURL(fragmentShaderUrl));
    gl.enable(gl.DEPTH_TEST);
    // Load file.
    const streamReader = await loadBinaryDataStreamFromURL("./../../data/bunny.smm")
    const mesh = await SimpleMeshModelIO.load(streamReader);

    triangleMeshGL = new TriangleMeshGL(gl, mesh);
    requestAnimationFrame(draw);
  }

  /**
   * This function is executed, whenever the browser decides to draw a new image. 
   */
  function draw() {
    resize();
    // Matritzenwerte
    let translateX = parseFloat(document.getElementById("TranslateX").value);
    let translateY = parseFloat(document.getElementById("TranslateY").value);
    let translateZ = parseFloat(document.getElementById("TranslateZ").value);

    let rotationX = parseFloat(document.getElementById("RotationX").value);
    let rotationY = parseFloat(document.getElementById("RotationY").value);
    let rotationZ = parseFloat(document.getElementById("RotationZ").value);

    let nearPlaneDistance = parseFloat(document.getElementById("NearPlane").value);
    let farPlaneDistance = parseFloat(document.getElementById("FarPlane").value);
    let fieldOfViewRadians = parseFloat(document.getElementById("FieldOfView").value);

    // Hintergrund Farbwerte
    let backgroundColor = document.getElementById("backgroundColor").value;
    // Farben für den Hintergrund
    let rB = parseInt(backgroundColor.substr(1, 2), 16) / 255.0;
    let gB = parseInt(backgroundColor.substr(3, 2), 16) / 255.0;
    let bB = parseInt(backgroundColor.substr(5, 2), 16) / 255.0;

    let overlayWireFrame = document.getElementById("useWireFrame").checked;
    // Wireframe Farbwerte
    let wireFrameColor = document.getElementById("WireFrameColor").value;
    // Farben für das Wireframe
    let rW = parseInt(wireFrameColor.substr(1, 2), 16) / 255.0;
    let gW = parseInt(wireFrameColor.substr(3, 2), 16) / 255.0;
    let bW = parseInt(wireFrameColor.substr(5, 2), 16) / 255.0;
    // Lab 04, 1(e)

    let aspectRatio = mCanvas.width > mCanvas.height ? mCanvas.width / mCanvas.height : mCanvas.height / mCanvas.width;
 
    let rotationX_Matrix = Matrix4.rotationX(rotationX);
    let rotationY_Matrix = Matrix4.rotationY(rotationY);
    let rotationZ_Matrix = Matrix4.rotationZ(rotationZ);
    let translationMatrix = Matrix4.translation(translateX, translateY, translateZ);
    let perspectiveMatrix = Matrix4.perspective(fieldOfViewRadians, aspectRatio, nearPlaneDistance, farPlaneDistance);
    
    // Lab 05, 2e
    let mv = Matrix4.multiply(translationMatrix, Matrix4.multiply(rotationX_Matrix, Matrix4.multiply(rotationZ_Matrix, rotationY_Matrix)));
   
    let mvp = Matrix4.multiply(perspectiveMatrix, mv);
    const u_mvp = mGlslProgram.getUniformLocation('mat4_transform');
    // was macht getUniformLocation
    // wir haben JS file z.B. Mesh3D.js --> auf CPU ausgeführt
    // und wir haben GPU --> "da leben diese Shader (mGLSLProgram: besteht aus Vertex-Shader (mesh3d.vert.glsl) und fragment-shader (mesh3d.frag.glsl)"
    // --> Das sind Textdateien, existieren auf CPU, wird dort kompiliert und auf GPU hochgeladen
    // dann magie, idk

    gl.clearColor(rB, gB, bB, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Wireframe Farbe setzen
    // UniformLocation holt den Wert aus dem Fragment-shader
    let wireFrameFarbe = mGlslProgram.getUniformLocation('u_wfColor');
    let wireFrameBool = mGlslProgram.getUniformLocation('u_useWireframe');
    
    // Lab 05, 2e+f
    const u_mv = mGlslProgram.getUniformLocation('u_mv');

    // Lab 04, 1(a)
    // Shader benutzen
    mGlslProgram.use();

    // Uniform3 float für Übergabe der Wireframe Farbwerte
    gl.uniform3f(wireFrameFarbe, rW, gW, bW);
    
    // Lab 04, 1(f)
    gl.uniformMatrix4fv(u_mvp, true, mvp);

    // Lab 05, 2f 
    gl.uniformMatrix4fv(u_mv, true, mv);

    // wireFrameBool auf False setzen
    gl.uniform1i(wireFrameBool, 0);
    
    triangleMeshGL.draw();

    // FÜR WIREFRAME
    // Kontrolle ob Häkchen gesetzt ist
    // Falls ja, setze wireFrameBool auf True und zeichne Wireframe
    if (document.getElementById("useWireFrame").checked) {
      gl.uniform1i(wireFrameBool, 1);
      triangleMeshGL.drawWireFrame();
    } else {
      gl.uniform1i(wireFrameBool, 0);
    }

    requestAnimationFrame(draw);
      // Lab 04, 1(h)
  }

  /**
   * This method is executed once the drawing window dimensions change.
   */
  function resize() {
    let w = mCanvas.clientWidth;
    let h = mCanvas.clientHeight;

    if (mCanvas.width != w || mCanvas.height != h) {
      mCanvas.width = w;
      mCanvas.height = h;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }
  setup();
}

async function main() {
  
  let t = new Mesh3DApp();
}

main();


