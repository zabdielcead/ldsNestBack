import { HttpException, HttpStatus } from "@nestjs/common";

export class DataException extends HttpException {
    constructor(customMessage:String) {
      super(`Error LDS Data=${customMessage}`, HttpStatus.BAD_REQUEST);
    }
  }