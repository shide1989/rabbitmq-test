import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagingService } from './messaging/messaging.service';

@Controller()
export class AppController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get()
  getHello(): string {
    return 'toto';
  }
}
