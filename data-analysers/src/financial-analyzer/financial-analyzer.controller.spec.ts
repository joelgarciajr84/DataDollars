import { Test, TestingModule } from '@nestjs/testing';
import { FinancialAnalyzerController } from './financial-analyzer.controller';

describe('FinancialAnalyzerController', () => {
  let controller: FinancialAnalyzerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialAnalyzerController],
    }).compile();

    controller = module.get<FinancialAnalyzerController>(FinancialAnalyzerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
