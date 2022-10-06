import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EXCHANGES } from './topic-messaging.constants';

// optionally specify a type for generic type checking support
interface RoutingDTO {
  routing_key: string;
}

@Controller('messaging')
export class TopicMessagingController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/topic')
  public publishTopic(@Body() data: RoutingDTO) {
    console.log('[topic] publishing data', data);
    this.amqpConnection.publish(EXCHANGES.TOPIC, data.routing_key, data);
  }
}
