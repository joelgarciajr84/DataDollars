import { Test, TestingModule } from '@nestjs/testing';
import { FinancialAnalyzerService } from './financial-analyzer.service';

describe('FinancialAnalyzerService', () => {
  let service: FinancialAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialAnalyzerService],
    }).compile();

    service = module.get<FinancialAnalyzerService>(FinancialAnalyzerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
