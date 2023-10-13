import { Test, TestingModule } from '@nestjs/testing';
import { FinancialFakeDataController } from './financial-fake-data.controller';

describe('FinancialFakeDataController', () => {
  let controller: FinancialFakeDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialFakeDataController],
    }).compile();

    controller = module.get<FinancialFakeDataController>(FinancialFakeDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
