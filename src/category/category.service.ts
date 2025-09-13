import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: name },
    });
    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }
    const category = this.categoryRepository.create({
      name,
      description: '',
      image: '',
    });
    return this.categoryRepository.save(category);
  }


  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    const category = this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const cateory=this.categoryRepository.findOne({ where: { id } });
    if(!cateory){
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
