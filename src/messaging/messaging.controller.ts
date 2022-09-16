import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EXCHANGE_NAME } from './messaging.constants';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/publish')
  public publish<T = any>(
    @Body() data: { routing_key: string },
    // options?: amqplib.Options.Publish,
  ) {
    console.log('publishing data', data);

    // optionally specify a type for generic type checking support
    interface CustomModel {
      foo: string;
      bar: string;
    }
    this.amqpConnection.publish(EXCHANGE_NAME, data.routing_key, data);
    // this will now show an error that you are missing properties: foo, bar
  }
}
