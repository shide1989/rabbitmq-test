import { Injectable } from '@nestjs/common';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { BINDINGS, EXCHANGE_NAME } from './messaging.constants';

@Injectable()
export class MessagingService {
  // @RabbitRPC({
  //   exchange: EXCHANGE_NAME,
  //   routingKey: BINDINGS[0].routing_key, //test1.#
  //   queue: BINDINGS[0].destination, //queue_nest_test_1
  //   // queueOptions: {
  //   //   channel: 'channel-2',
  //   // },
  // })
  // public async rpcHandler(msg: {}) {
  //   console.log(`Received rpc message: ${JSON.stringify(msg)}`);
  //
  //   return { message: 'hi' };
  // }

  @RabbitSubscribe({
    exchange: EXCHANGE_NAME,
    routingKey: BINDINGS.CARDS.routing_keys[0], //ev.card.created
    queue: BINDINGS.CARDS.destination, //ev.card
    createQueueIfNotExists: false,
    queueOptions: {
      channel: 'created',
    },
  })
  public async pubSubHandler(msg: { routing_key: string }, headers: any) {
    // Shouled receive card.created
    console.log(
      `[ev.card created] Received pub/sub message: ${JSON.stringify(msg)}`,
    );
    // console.log('pubSubHandler headers', headers);
  }

  @RabbitSubscribe({
    exchange: EXCHANGE_NAME,
    routingKey: BINDINGS.CARDS.routing_keys[1], //ev.card.updated
    queue: BINDINGS.CARDS.destination, //ev.card
    createQueueIfNotExists: false,
    queueOptions: {
      channel: 'updated',
    },
  })
  public async pubSubHandler2(msg: { routing_key: string }, headers: any) {
    // Shouled receive card.created
    console.log(
      `[ev.card updated] Received pub/sub message: ${JSON.stringify(msg)}`,
    );
    // console.log('pubSubHandler headers', headers);
  }

  // @RabbitSubscribe({
  //   exchange: EXCHANGE_NAME,
  //   routingKey: BINDINGS[1].routing_key, //ev.service.updated
  //   queue: BINDINGS[1].destination, //ev
  //   // queueOptions: {
  //   //   channel: BINDINGS[1].channel,
  //   // },
  // })
  // public async pubSubHandler3(msg: { routing_key: string }, context: any) {
  //   // Shouled receive card.updated
  //   console.log(`[ev.badge] Received pub/sub message: ${JSON.stringify(msg)}`);
  //   // console.log('pubSubHandler headers', context);
  // }
}
