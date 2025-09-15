import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly categoryService: CategoryService,

  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, stock, category_id } = createProductDto;


    const category = await this.categoryService.findOne(category_id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${category_id} not found`);
    }

    const product = this.productRepository.create({
      name,
      description,
      price,
      stock,
      category,
    });

    return this.productRepository.save(product);
  }


  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }


  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

 
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
  }
}
