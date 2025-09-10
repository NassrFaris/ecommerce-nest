import{
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,

}from 'typeorm';

export enum UserRole{
    SUPER_ADMIN='SUPER_ADMIN',
    ADMIN='ADMIN',
    COSTUMER='COSTUMER',
}


@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({length:100})
    name:string;
    @Column({unique:true})
    email:string;
    @Column({length:100})
    password:string;
    @Column({type:'enum',enum:UserRole,default:UserRole.COSTUMER})
    role:UserRole;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
