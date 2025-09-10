import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { CategoryModule } from './category/category.module';
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
    }),
    UserModule,
    CategoryModule,
  ],

})
export class AppModule {}