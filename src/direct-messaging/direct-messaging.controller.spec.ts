import { Test, TestingModule } from '@nestjs/testing';
import { DirectMessagingController } from './direct-messaging.controller';

describe('MessagingController', () => {
  let controller: DirectMessagingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectMessagingController],
    }).compile();

    controller = module.get<DirectMessagingController>(
      DirectMessagingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
