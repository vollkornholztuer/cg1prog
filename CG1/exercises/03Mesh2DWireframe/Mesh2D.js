import GLSLProgram  from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL, loadBinaryDataStreamFromURL } from "./../../lib/helper/http.js";
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"
import { TriangleMeshGL } from "./TriangleMeshGL.js"
import { Matrix3 } from "./Matrix3.js"

function Mesh2DApp() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  
  let mGlslProgram = null;
  let triangleMeshGL = null;

  async function setup() {
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(mCanvas, await loadDataFromURL(vertexShaderUrl), await loadDataFromURL(fragmentShaderUrl));

    // Load file.
    const streamReader = await loadBinaryDataStreamFromURL("../../data/lion.smm")
    const mesh = await SimpleMeshModelIO.load(streamReader);    

    triangleMeshGL = new TriangleMeshGL(gl, mesh);

    requestAnimationFrame(draw);
  }

  function draw() {
    resize();

    // Hintergrund Farbwerte
    let backgroundColor = document.getElementById("backgroundColor").value;

    // Wireframe Farbwerte
    let wireframeColor = document.getElementById("WireFrameColor").value;

    // Matritzenwerte
    let translateX = document.getElementById("TranslateX").value;
    let translateY = document.getElementById("TranslateY").value;
    let scaleX = document.getElementById("ScaleX").value;
    let scaleY = document.getElementById("ScaleY").value;
    let rotation = document.getElementById("Rotation").value;

    
    // Farben für den Hintergrund
    let rB = parseInt(backgroundColor.substr(1,2),16)/256.0;
    let gB = parseInt(backgroundColor.substr(3,2),16)/256.0;
    let bB = parseInt(backgroundColor.substr(5,2),16)/256.0;

    // Farben für den Wireframe
    let rW = parseInt(wireframeColor.substr(1,2),16)/256.0;
    let gW = parseInt(wireframeColor.substr(3,2),16)/256.0;
    let bW = parseInt(wireframeColor.substr(5,2),16)/256.0;


    // Lab 02, Aufgabe 3(b)
    // TODO - parseFloat evlt?
    var rotationMatrix = Matrix3.rotation(Number(rotation));
    var translateMatrix = Matrix3.translation(Number(translateX), Number(translateY));
    var scaleMatrix = Matrix3.scaling(Number(scaleX), Number(scaleY));
    var aspect = Matrix3.aspect(mCanvas.width, mCanvas.height);

    // Erst Skalierung, dann Rotation, dann translation, dann Seitenverhältnis multiplizieren - sonst bild doof
    const transform = Matrix3.multiply(aspect, Matrix3.multiply(translateMatrix, Matrix3.multiply(rotationMatrix, scaleMatrix)));
    const mat3_transform = mGlslProgram.getUniformLocation('mat3_transform');

    // Lab 02, Aufgabe 3(c)

    // Lab 02, Aufgabe 1(c)
    gl.clearColor(rB, gB, bB, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Wireframefarbe setzen
    // UniformLocation holt den Wert aus dem Fragment-shader
    let wireFrameFarbe = mGlslProgram.getUniformLocation('u_wfColor');
    let wireFrameBool = mGlslProgram.getUniformLocation('u_useWireframe');

  
    // Lab 02, Aufgabe 1(b)
    // Shader benutzen
    mGlslProgram.use();

    // Uniform3 float für Übergabe der Wireframe Farbwerte
    gl.uniform3f(wireFrameFarbe, rW, gW, bW);
    
    // Lab 02, Aufgabe 3(b)
    gl.uniformMatrix3fv(mat3_transform, true, transform);

    // wireFrameBool auf False setzen
    gl.uniform1i(wireFrameBool, 0);

    // Lab 02, Aufgabe 1(b)
    triangleMeshGL.draw();

    // Lab 03, Aufgabe 1(b)
    // Kontrolle ob Häkchen gesetzt ist
    // Falls ja, setze wireFrameBool auf True und zeichne Wireframe
    if (document.getElementById("useWireFrame").checked) {
      gl.uniform1i(wireFrameBool, 1);
      triangleMeshGL.drawWireFrame();
    } else {
      gl.uniform1i(wireFrameBool, 0);
    }

    requestAnimationFrame(draw);
  }

  function resize() {
    let w = mCanvas.clientWidth;
    let h = mCanvas.clientHeight;

    if (mCanvas.width != w || mCanvas.height != h) 
    {
      mCanvas.width = w;
      mCanvas.height = h;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }
  setup();
}

async function main() {

  var millisecondsToWait = 1;

  setTimeout(function() {
    let t = new Mesh2DApp();
  }, millisecondsToWait)

}

main();


