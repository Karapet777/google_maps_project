import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RestaurantEntity } from './restaurant/restaurant.entity';
import { CommentEntity } from './restaurant/comment.entity';
import { RestaurantRateEntity } from './restaurant/restaurant-rate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'restaurant',
      entities: [
        RestaurantEntity,
        RestaurantRateEntity,
        CommentEntity,
      ],
      synchronize: true,
    }),
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
