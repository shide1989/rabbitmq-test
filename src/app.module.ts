import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingController } from './messaging/messaging.controller';
import { MessagingService } from './messaging/messaging.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BINDINGS, EXCHANGE_NAME } from './messaging/messaging.constants';

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: EXCHANGE_NAME,
          type: 'topic',
        },
      ],
      uri: 'amqp://admin:admin@ts-rabbitmq:5672',
      enableControllerDiscovery: true,
      channels: {
        created: {
          prefetchCount: 1,
          default: true,
        },
        updated: {
          prefetchCount: 1,
        },
      },
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
  ],
  controllers: [AppController, MessagingController],
  providers: [AppService, MessagingService],
})
export class AppModule {}
