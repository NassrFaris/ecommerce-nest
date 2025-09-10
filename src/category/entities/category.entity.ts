import{
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,

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
}
