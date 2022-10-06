import { Test, TestingModule } from '@nestjs/testing';
import { TopicMessagingController } from './topic-messaging.controller';

describe('MessagingController', () => {
  let controller: TopicMessagingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicMessagingController],
    }).compile();

    controller = module.get<TopicMessagingController>(TopicMessagingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
