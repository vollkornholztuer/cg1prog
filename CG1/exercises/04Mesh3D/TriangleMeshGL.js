// sank yu kaddah 4 sponsoring

// @ts-check
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"

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
        
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        const triangles     = simpleMeshIO.indices;
        const positions     = simpleMeshIO.positions;
        const colors        = simpleMeshIO.colors;

        const positionAttributeLocation = 0;
        this.positions = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation);


        // 1(b) - If-Statement einfügen
        if(colors != null) {
            const colorAttributeLocation = 1;
            const cb = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cb);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0)
            gl.enableVertexAttribArray(colorAttributeLocation); 
        }
        
        const ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(triangles), gl.STATIC_DRAW);

        // WIREFRAME
        // Lab 03, Aufgabe 1(a)
        this.vaoWireFrame = gl.createVertexArray();
        gl.bindVertexArray(this.vaoWireFrame);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttributeLocation);
        
        const lines = [];
        for(let i = 0; i < this.nTriangleIndices/3; i++){
            const i0 = triangles[i*3+0];
            const i1 = triangles[i*3+1];
            const i2 = triangles[i*3+2];

            lines.push(i0, i1, i1, i2, i2, i0);
        }
        this.nLineIndicies = lines.length;

        const lb = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lb);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(lines), gl.STATIC_DRAW);      
    }

    /**
     * Draws a mesh with solid.
     */
    draw()
    {
        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.TRIANGLES, this.nTriangleIndices, this.gl.UNSIGNED_INT, 0);
    }

    //Lab 03 Aufgabe 1
    drawWireFrame(){
        this.gl.bindVertexArray(this.vaoWireFrame);
        this.gl.drawElements(this.gl.LINES, this.nLineIndicies, this.gl.UNSIGNED_INT, 0);   
    }

    
}
