import { Category } from 'src/category/entities/category.entity';
import{
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,

}from 'typeorm';
import { ProductImage } from './product-images.entity';

@Entity('products')
export class Product {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  image:string;

  @Column()
  category_id: number;
  
  @ManyToOne(() => Category, (category) => category.products,{eager:true})
  @JoinColumn({ name: 'category_id' })
  category: Category;


   @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

}

