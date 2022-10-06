import { Body, Controller, Post } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EXCHANGES } from './direct-messaging.constants';

interface RoutingDTO {
  routing_key: string;
}

/**
 * Direct messaging testing controller.
 * @example (unlockPumpHandler) :
    curl --location --request POST 'localhost:3000/messaging/direct' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "routing_key": "routing.task.unlock.pump",
        "session_id": "xxx-xxxx-xxx-xxx"
    }'
 * @example (cancelSessionHandler) :
   curl --location --request POST 'localhost:3000/messaging/direct' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "routing_key": "routing.task.cancel.session",
      "session_id": "xxx-xxxx-xxx-xxx"
    }'
 */
@Controller('messaging')
export class DirectMessagingController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/direct')
  public publishDirect(@Body() data: RoutingDTO) {
    console.log('[direct] publishing data', data);

    this.amqpConnection.publish(EXCHANGES.DIRECT, data.routing_key, data);
  }
}
