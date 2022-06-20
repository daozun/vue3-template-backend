import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        code: transformStatus(context),
        data: data,
      })),
    );
  }
}

function transformStatus(context: ExecutionContext): HttpStatus {
  const statusCode = context.switchToHttp().getResponse().statusCode;

  if (statusCode === HttpStatus.CREATED) {
    return HttpStatus.OK;
  }

  return statusCode;
}
