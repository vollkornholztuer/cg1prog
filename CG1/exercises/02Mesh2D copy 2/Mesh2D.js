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

    let backgroundColor = document.getElementById("backgroundColor").value;

    let translateX = document.getElementById("TranslateX").value;
    let translateY = document.getElementById("TranslateY").value;
    let scaleX = document.getElementById("ScaleX").value;
    let scaleY = document.getElementById("ScaleY").value;
    let rotation = document.getElementById("Rotation").value;
    
    let rB = parseInt(backgroundColor.substr(1,2),16)/256.0;
    let gB = parseInt(backgroundColor.substr(3,2),16)/256.0;
    let bB = parseInt(backgroundColor.substr(5,2),16)/256.0;

    // Lab 02, Aufgabe 3(b)
    Matrix3.translation(translateX, translateY);
    Matrix3.scaling(scaleX, scaleY);
    Matrix3.rotation(rotation);

    // Lab 02, Aufgabe 3(c)

    // Lab 02, Aufgabe 1(c)
    gl.clearColor(rB, gB, bB, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    // Lab 02, Aufgabe 1(b)
    mGlslProgram.use();
    triangleMeshGL.draw();

    // Lab 02, Aufgabe 3(b)
   
    requestAnimationFrame(draw);A
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

  var millisecondsToWait = 6;

  setTimeout(function() {
    let t = new Mesh2DApp();
  }, millisecondsToWait)

}

main();


