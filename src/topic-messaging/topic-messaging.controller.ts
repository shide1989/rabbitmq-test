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

  /**
   * Topic Messaging example
   * @example (notify a session that was updated) :
       curl --location --request POST 'localhost:3000/messaging/topic' \
       --header 'Content-Type: application/json' \
       --data-raw '{
        "routing_key": "routing.event.pap.session.updated",
        "session_id": "xxx-xxxx-xxx-xxx"
      }'
   */
  @Post('/topic')
  public publishTopic(@Body() data: RoutingDTO) {
    console.log('[TopicMessagingController] publishing data', data);
    this.amqpConnection.publish(EXCHANGES.TOPIC, data.routing_key, data);
  }
}
