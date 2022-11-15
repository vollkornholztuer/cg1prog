import { CograError } from "./cogra-error.js";

export class GLSLRuntimeError extends CograError {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
  }
}
