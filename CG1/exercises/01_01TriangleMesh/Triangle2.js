// Sources
// https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
// https://en.wikipedia.org/wiki/Triangle_strip
// https://en.wikipedia.org/wiki/Triangle_fan
// https://stackoverflow.com/questions/66769827/how-can-i-draw-two-triangles-colored-by-vertex-in-webgl
// https://webgl2fundamentals.org/webgl/lessons/webgl-points-lines-triangles.html
// https://www.w3schools.com/howto/howto_js_rangeslider.asp


import GLSLProgram from "../../lib/helper/glsl-program.js";
import { loadDataFromURL } from "../../lib/helper/http.js";

// Javascript Slider

function SimpleTriangle() {

  // Javascript Slider - source: w3schools
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;

  // aktualisiert Slider auf Eingabe
  slider.oninput = function() {
    output.innerHTML = this.value;
  }

  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  let mGlslProgram = null;
  let vao = null;

  async function setup() {
    // 1. Create Mesh on the CPU


    // 1.1 Positions

    // NEUE POSITIONEN
    const positions = [
      1.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
      1.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 0.0,
    ];

    // ALTE POSITIONEN
    // const positions = [
    //   0.0, 1.0, 0.0, 1.0,
    //   1.0, -1.0, 0.0, 1.0,
    //   -1.0, -1.0, 0.0, 1.0,
    // ];

    // 1.2 Colors
    const colors = [
      1.0, 0.0, 0.0, 
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0,

      0.0, 1.0, 0.0, 
      1.0, 1.0, 1.0,
      0.0, 0.0, 0.0
    ];

    // 1.3 Index Buffer
    // Vorherige indices
    // const indices = [0, 1, 2];

    // Neue Indices
    const indices = [0, 1, 2, 3, 4, 5, 6];

    // 2. Create & Bind Vertex Array on the GPU
    vao = gl.createVertexArray(); //erstellt Array
    gl.bindVertexArray(vao); // binded Array zu GPU

    // 2.1 Create, bind and upload Vertex Positions to GPU
    const pb = gl.createBuffer(); // erstellt Positionsbuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, pb); // bindet Array buffer an Positionsbuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // Speicher zu Vertex Buffer hinzufügen

    // 2.2 Configure Vertex Position attribute
    const positionAttributeLocation = 0;
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 4 , gl.FLOAT, false, 0, 0);

    // 3. Create, bind and upload Index Buffer
    const ib = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);


    // aaaaaaaaaaaaaaaaaaaaaaaa
    // aaaaaaaaaaaaaaaaaaaaaaaa
    // 2.1 Create, bind and upload Color-Positions to GPU
    const cb = gl.createBuffer(); // erstellt Farbbuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, cb); // bindet Array buffer an Positionsbuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW); // Speicher zu Color Buffer hinzufügen

    // 2.2 Configure Color Position attribute
    const colorAttributeLocation = 1; // siehe location = 1 in triangle.vert.glsl
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0); // 3 Elemente pro Vektor
    // aaaaaaaaaaaaaaaaaaaaaaaa
    // aaaaaaaaaaaaaaaaaaaaaaaa





    // 4. Create a Shader
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(
      mCanvas,
      await loadDataFromURL(vertexShaderUrl),
      await loadDataFromURL(fragmentShaderUrl)
    );

    requestAnimationFrame(draw);
  }


  function draw() {

    mCanvas.width = mCanvas.clientWidth;
    mCanvas.height = mCanvas.clientHeight;
    gl.viewport(0,0, gl.canvas.width, gl.canvas.height);
    
    // 5. Clear screen (see 00ClearScreen)
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);  

    // 6. Bind shader program
    mGlslProgram.use();

    


    const u_scale = mGlslProgram.getUniformLocation("u_scale");
    gl.uniform1f(u_scale, 0.02 * slider.value); // slider implementieren

    // 7. Bind Vertex Array Object (see step 2)
    gl.bindVertexArray(vao);

    // gl.TRIANGLES durch gl.TRIANGLE_FAN ersetzt (GUD CODE, NICHT ANFASSEN)
    // gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_INT, 0);

    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
    gl.drawArrays(gl.LINE_LOOP, 0, 4);


    // gl.drawElements(gl.TRIANGLE, 3, gl.UNSIGNED_INT, 0);

    // gl.drawArrays(gl.TRIANGLE, 0, 6);
    
    // 8. Draw triangle mesh.
    
    requestAnimationFrame(draw);
  }



  setup();
}

async function main() {

  var millisecondsToWait = 6;

  setTimeout(function() {
    let t = new SimpleTriangle();
  }, millisecondsToWait);  
  
}

main();


