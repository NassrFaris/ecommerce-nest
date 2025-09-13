import { Product } from 'src/product/entities/product.entity';
import{
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    OneToMany,

}from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({length:100})
    name:string;
    @Column({length:1000,nullable:true})
    image:string;
    @Column({nullable:true})
    description:string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(()=>Product,(product)=>product.category)
    products:Product[];
}
