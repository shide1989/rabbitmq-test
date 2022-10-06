import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DirectMessagingController } from './direct-messaging/direct-messaging.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TopicMessagingController } from './topic-messaging/topic-messaging.controller';
import { DirectMessagingService } from './direct-messaging/direct-messaging.service';
import { TopicMessagingTopicService } from './topic-messaging/topic-messaging-topic.service';

export interface IRabbitConfiguration {
  RABBITMQ_CONNECT_WAIT: string;
  RABBITMQ_CONNECT_TIMEOUT: string;
  RABBITMQ_EXCHANGE_MAIN: string;
  RABBITMQ_EXCHANGE_TYPE: string;
  RABBITMQ_DSN: string;
}

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],

      useFactory: (config: ConfigService<IRabbitConfiguration>) => ({
        connectionInitOptions: {
          wait: config.get('RABBITMQ_CONNECT_WAIT') === 'true',
          timeout: config.get('RABBITMQ_CONNECT_TIMEOUT') || 5000,
        },
        exchanges: [
          {
            name: 'hub-tasks.direct',
            type: 'direct',
          },
          {
            name: 'hub-events.topic',
            type: 'topic',
          },
        ],
        uri: config.get('RABBITMQ_DSN', 'amqp://admin:admin@ts-rabbitmq:5672'),
        enableControllerDiscovery: false,
        // channels: {
        //   created: {
        //     prefetchCount: 1,
        //     default: true,
        //   },
        //   updated: {
        //     prefetchCount: 1,
        //   },
        // },
        // channels: {
        //   [BINDINGS[0].channel]: {
        //     prefetchCount: 1,
        //     default: true,
        //   },
        //   [BINDINGS[1].channel]: {
        //     prefetchCount: 1,
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DirectMessagingController, TopicMessagingController],
  providers: [DirectMessagingService, TopicMessagingTopicService],
})
export class AppModule {}
