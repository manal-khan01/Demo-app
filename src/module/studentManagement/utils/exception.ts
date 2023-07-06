class Exception {
    errType: String;
    message: String;
    err?: any;
  
    constructor(errType: String, message: String, stackTrace?: any) {
      this.errType = errType;
      this.message = message;
      if (stackTrace) {
        this.err = stackTrace;
      }
    }
  }
  
  export default Exception;
  