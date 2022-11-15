import { CograError } from "./cogra-error.js";

export class IllegalArgumentError extends CograError {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
  }
}
