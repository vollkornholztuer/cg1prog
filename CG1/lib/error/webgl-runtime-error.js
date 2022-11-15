import { CograError } from "./cogra-error.js";

export class WebGLRuntimeError extends CograError {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
  }
}
