import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCustom } from '../interfaces/response.error';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
   
    const respError:ErrorCustom = {
        estatus: `NOK`,
        descEstatus: `status=${status}|descerror=${exception.code}`
    }
    response
      .status(400)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: respError
      });
  }
}