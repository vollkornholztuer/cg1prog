// @ts-check
function ClearScreen() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  
  async function setup() {
    requestAnimationFrame(draw);
  }


  function draw() {   
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(1, 0.5, 0, 1);
    // gl.clearColor(Math.random(), Math.random(), Math.random(), 1);
    requestAnimationFrame(draw);
  }

  setup();
}

async function main() {
  let t = new ClearScreen();
}

main();


