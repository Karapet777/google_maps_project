import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantEntity } from './restaurant.entity';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RateRestaurantDto } from './dto/rate-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  getAll(): Promise<RestaurantEntity[]> {
    return this.restaurantService.getAll();
  }

  @Post('rate')
  rate(
    @Body() rateRestaurantDto: RateRestaurantDto,
  ): Promise<RestaurantEntity> {
    return this.restaurantService.rateRestaurant(rateRestaurantDto);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<RestaurantEntity> {
    return this.restaurantService.getById(id);
  }

  @Post(':id/comment')
  createComment(
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    return this.restaurantService.createComment(id, createCommentDto);
  }
}
