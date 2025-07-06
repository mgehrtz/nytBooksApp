import { Controller, Get } from '@nestjs/common';
import { CategoryDataAccessService } from '../data-access/category-data-access.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryDal: CategoryDataAccessService) {}

  @Get('all')
  public async getAllCategories() {
    return await this.categoryDal.getAll();
  }
}
