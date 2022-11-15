export class SimpleMeshModelIO {
  static async load(stream) {
    const streamReader = stream.getReader();
    let dataUint8 = new Uint8Array();
    do {
      const chunk = await streamReader.read();
      if (chunk.value && chunk.value.byteLength > 0) {
        const oldData = new Uint8Array(dataUint8);
        dataUint8 = new Uint8Array(oldData.byteLength + chunk.value.byteLength);
        dataUint8.set(oldData);
        dataUint8.set(chunk.value, oldData.byteLength);
      }

      if (chunk.done) {
        streamReader.releaseLock();
      }
    } while (stream.locked);

    {
      let pos = 0;
      const dataUint32 = new Uint32Array(dataUint8.buffer);
      const numOftriangles = dataUint32[pos++]
      const indices = dataUint32.subarray(1, pos + numOftriangles * 3);
      pos += indices.length;
      const numberOfVertices = dataUint32[pos++];
      const positions = new Float32Array(dataUint32.buffer).subarray(pos, pos + numberOfVertices * 3);
      pos += positions.length
      const hasColors = dataUint32[pos++];
      const colors = (!hasColors) ? null : new Float32Array(dataUint32.buffer).subarray(pos, pos + numberOfVertices * 3);
      pos += (!hasColors) ? 0 : colors.length;
      const hasNormals = dataUint32[pos++];
      const normals = (!hasNormals) ? null : new Float32Array(dataUint32.buffer).subarray(pos, pos + numberOfVertices * 3);
      pos += (!hasNormals) ? 0 : normals.length;
      const hasTexCoords = dataUint32[pos++];
      const texCoords = (!hasTexCoords) ? null : new Float32Array(dataUint32.buffer).subarray(pos, pos + numberOfVertices * 3);
      pos += (!hasTexCoords) ? 0 : texCoords.length;

      return new SimpleMeshModelIO(indices, positions, colors, normals, texCoords);
    }
  }

  constructor(indices, positions, colors, normals, texCoords) {
    this.indices = indices; // 3 consecutive integers make a triangle
    this.positions = positions; // 3 consecutive floats make a 3d position
    this.colors = colors; // 3 consecutive floats make an r, g, b color
    this.normals = normals; // 3 consecutive floats make a 3d normal vector
    this.texCoords = texCoords; // 2 consecutive floats make a 2d texture coordinate
  }
}
