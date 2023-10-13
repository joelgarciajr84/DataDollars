import { Test, TestingModule } from '@nestjs/testing';
import { FinancialFakeDataService } from './financial-fake-data.service';

describe('FinancialFakeDataService', () => {
  let service: FinancialFakeDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialFakeDataService],
    }).compile();

    service = module.get<FinancialFakeDataService>(FinancialFakeDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
