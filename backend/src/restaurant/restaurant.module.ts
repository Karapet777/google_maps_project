import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { CommentEntity } from './comment.entity';
import { RestaurantRateEntity } from './restaurant-rate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantEntity,
      RestaurantRateEntity,
      CommentEntity,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
