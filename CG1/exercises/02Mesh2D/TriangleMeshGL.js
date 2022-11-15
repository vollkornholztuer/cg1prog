// @ts-check
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"
import { Matrix3 } from "./Matrix3.js";

export class TriangleMeshGL{

    /**
     * Creates a triangle mesh with positions, colors and texture coordinates
     * drawable with WebGL2.
     * 
     * @param {WebGL2RenderingContext} gl WebGL Rendering Context
     * @param {SimpleMeshModelIO} simpleMeshIO Simple Mesh IO
     */ 
    constructor(gl, simpleMeshIO) {
        this.gl = gl;
        this.nTriangleIndices = simpleMeshIO.indices.length;
        this.vao = 0;
        
        const triangles     = simpleMeshIO.indices;
        const positions     = simpleMeshIO.positions;
        const colors        = simpleMeshIO.colors;

        // Lab 02, Aufgabe 1(a)

        // 2. Create & Bind Vertex Array on the GPU
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        // 2.1 Create, bind and upload Vertex Positions to GPU
        this.positions = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        // 2.2 Configure Vertex Position attribute
        const positionAttributeLocation = 0;
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0); // TODO evtl 3 und 4 vertauschen

        // 3. Create, bind and upload Index Buffer
        const ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(triangles), gl.STATIC_DRAW);


        // 2.1 Create, bind and upload Color-Positions to GPU
        const cb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        // 2.2 Configure Color Position Attribute
        const colorAttributeLocation = 1;
        gl.enableVertexAttribArray(colorAttributeLocation);
        gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    }

    /**
     * Draws a mesh with solid.
     */
    draw()
    {
        // Lab 02, Aufgabe 1(b)
        // TODO unkommentieren?
        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.TRIANGLES, this.nTriangleIndices, this.gl.UNSIGNED_INT, 0);
    }

    
}