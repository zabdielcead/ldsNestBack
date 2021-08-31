import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { HeaderException } from './header.exception';

@Injectable()
export class InterceptorHeaderInterceptor implements NestInterceptor {
  
  
  

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const ctx = context.switchToHttp();
    const req:Request = ctx.getRequest<Request>();

    const header1= req.get('authlds');
    
    console.log('authlds',header1);
   
     if(header1=== ''  || header1=== undefined ){
      throw new HeaderException('No se encuentra authlds en la petición Rest');
    }

    return next.handle();
  }
}
