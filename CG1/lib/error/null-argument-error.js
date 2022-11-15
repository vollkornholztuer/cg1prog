import { CograError } from "./cogra-error.js";

export class NullArgumentError extends CograError {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
  }
}
