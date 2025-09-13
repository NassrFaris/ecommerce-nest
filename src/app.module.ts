import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { Category } from './category/entities/category.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '20053309005',
      database: 'ecommerceNest',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User,Category,Product],
    }),
    UserModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}