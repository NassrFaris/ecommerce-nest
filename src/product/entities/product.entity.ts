import { Category } from 'src/category/entities/category.entity';
import{
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    ManyToOne,
    JoinColumn,

}from 'typeorm';

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

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category|null;

  @Column({ nullable: true })
  category_id?: number;
}

