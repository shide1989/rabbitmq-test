import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { BINDINGS, EXCHANGES } from './topic-messaging.constants';
import * as assert from 'assert';
import { Message } from 'amqplib/properties';

@Injectable()
export class TopicMessagingTopicService {
  @RabbitSubscribe({
    exchange: BINDINGS.PAP_TO_WSS.EVENTS[0].EXCHANGE,
    queue: BINDINGS.PAP_TO_WSS.EVENTS[0].QUEUE, // event.pap.session.updated
    routingKey: BINDINGS.PAP_TO_WSS.EVENTS[0].ROUTING_KEY, // routing.event.pap.session.#
    createQueueIfNotExists: true,
  })
  public async sessionNotificationConsumer(
    msg: { routing_key: string },
    context: Message,
  ) {
    console.log(
      `[sessionNotificationConsumer] Received message: ${JSON.stringify(msg)}`,
    );
    console.log(
      `[sessionNotificationConsumer] headers:`,
      context.properties.headers,
    );
    // Shouled receive 'routing.task.unlock.pump'
    const validRoutingKey = BINDINGS.PAP_TO_WSS.EVENTS[0].ROUTING_KEY.slice(
      0,
      -1,
    );
    assert.ok(
      msg.routing_key.startsWith(validRoutingKey),
      `sessionNotificationConsumer Should have received routing_key: '${validRoutingKey}'.`,
    );

    // This function acts as SFMC or CEH would, to then send data to MBC/SFMC/CEH etc..
  }

  @RabbitSubscribe({
    exchange: BINDINGS.PAP_TO_WSS.EVENTS[0].EXCHANGE,
    queue: BINDINGS.PAP_TO_WSS.EVENTS[0].QUEUE, // event.pap.session.updated
    routingKey: BINDINGS.PAP_TO_WSS.EVENTS[0].ROUTING_KEY, // routing.event.pap.session.#
    createQueueIfNotExists: true,
  })
  public async eventStoreConsumer(
    msg: { routing_key: string },
    context: Message,
  ) {
    console.log(
      `[eventStoreConsumer] Received message: ${JSON.stringify(msg)}`,
    );
    console.log(`[eventStoreConsumer] headers:`, context.properties.headers);

    // This function acts as an Event store MS would
  }
}
