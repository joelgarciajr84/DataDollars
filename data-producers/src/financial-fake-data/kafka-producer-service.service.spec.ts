import { Test, TestingModule } from '@nestjs/testing';
import { KafkaProducerServiceService } from './kafka-producer-service.service';

describe('KafkaProducerServiceService', () => {
  let service: KafkaProducerServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaProducerServiceService],
    }).compile();

    service = module.get<KafkaProducerServiceService>(KafkaProducerServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
