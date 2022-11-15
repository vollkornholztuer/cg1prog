export class CograError extends Error {
  constructor(message, fileName, lineNumber) {
    super();
    const err = new Error();
    if (err.stack) {
      // remove one stack level:
      if (typeof Components != "undefined") {
        // Mozilla:
        this.stack = err.stack.substring(err.stack.indexOf("\n") + 1);
      } else if (
        typeof chrome != "undefined" ||
        typeof process != "undefined"
      ) {
        // Google Chrome/Node.js:
        this.stack = err.stack.replace(/\n[^\n]*/, "");
      } else {
        this.stack = err.stack;
      }
    }
    this.message = message === undefined ? err.message : message;
    this.fileName = fileName === undefined ? err.fileName : fileName;
    this.lineNumber = lineNumber === undefined ? err.lineNumber : lineNumber;
  }
}
