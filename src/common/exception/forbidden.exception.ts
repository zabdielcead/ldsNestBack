import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor(customMessage:String) {
      super(`Error LDS= ${customMessage}`, HttpStatus.FORBIDDEN);
    }
  }