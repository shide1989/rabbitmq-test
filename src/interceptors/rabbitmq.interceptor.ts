import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class RabbitmqInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const contextType = context.getType<'http' | 'rmq'>();

    // Do nothing if this is a RabbitMQ event
    if (contextType === 'rmq') {
      return next.handle();
    }

    // Execute custom interceptor logic for HTTP request/response
    return next.handle();
  }
}
