import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { BINDINGS } from './direct-messaging.constants';
import * as assert from 'assert';
import { Message } from 'amqplib/properties';

@Injectable()
export class DirectMessagingService {
  @RabbitSubscribe({
    exchange: BINDINGS.ORDER_TO_PAP.TASKS[0].EXCHANGE, // hub-tasks.direct
    queue: BINDINGS.ORDER_TO_PAP.TASKS[0].QUEUE, // task.unlock.pump
    routingKey: BINDINGS.ORDER_TO_PAP.TASKS[0].ROUTING_KEY, // routing.task.unlock.pump,
    createQueueIfNotExists: true,
  })
  public async unlockPumpConsumer(
    msg: { routing_key: string },
    context: Message,
  ) {
    console.log(
      `[unlockPumpConsumer] Received message: ${JSON.stringify(msg)}`,
    );
    console.log(`[unlockPumpConsumer] headers:`, context.properties.headers);
    // Shouled receive 'routing.task.unlock.pump'
    assert.ok(
      msg.routing_key === BINDINGS.ORDER_TO_PAP.TASKS[0].ROUTING_KEY,
      `unlockPumpConsumer Should have received routing_key: '${BINDINGS.ORDER_TO_PAP.TASKS[0].ROUTING_KEY}'.`,
    );
  }

  @RabbitSubscribe({
    exchange: BINDINGS.ORDER_TO_PAP.TASKS[1].EXCHANGE, // hub-tasks.direct
    queue: BINDINGS.ORDER_TO_PAP.TASKS[1].QUEUE, // task.cancel.session
    routingKey: BINDINGS.ORDER_TO_PAP.TASKS[1].ROUTING_KEY, // routing.task.cancel.session,
    createQueueIfNotExists: true,
  })
  public async cancelSessionConsumer(
    msg: { routing_key: string },
    context: Message,
  ) {
    console.log(
      `[cancelSessionConsumer] Received message: ${JSON.stringify(msg)}`,
    );
    console.log(`[cancelSessionConsumer] headers:`, context.properties.headers);
    // Shouled receive 'routing.task.unlock.pump'
    assert.ok(
      msg.routing_key === BINDINGS.ORDER_TO_PAP.TASKS[1].ROUTING_KEY,
      `cancelSessionConsumer Should have received routing_key: '${BINDINGS.ORDER_TO_PAP.TASKS[1].ROUTING_KEY}'.`,
    );
  }
}
