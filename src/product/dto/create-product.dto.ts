import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  Min, 
  IsPositive 
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive() 
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0) 
  stock: number;

  @IsNumber()
  category_id: number;
}
