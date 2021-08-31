import { HttpException, HttpStatus } from "@nestjs/common";

export class HeaderException extends HttpException {
    constructor(customMessage:String) {
      super(`Error LDS header=${customMessage}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }