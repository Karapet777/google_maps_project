import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RestaurantRateEntity } from './restaurant-rate.entity';
import { RateRestaurantDto } from './dto/rate-restaurant.dto';
import { RestaurantSeed } from '../seed/restaurant';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantRateEntity)
    private readonly restaurantRateRepository: Repository<RestaurantRateEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {
    new RestaurantSeed(
      this.restaurantRepository,
      this.restaurantRateRepository,
      this.commentRepository,
    );
  }

  async getAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.createQueryBuilder('restaurant').getMany();
  }

  async getById(restaurantId: number): Promise<RestaurantEntity> {
    return this.restaurantRepository
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.comments', 'comments')
      .where('restaurant.id = :restaurantId', { restaurantId })
      .getOne();
  }

  async createComment(
    restaurantId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    const restaurant = await this.getById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const commentEntity = this.commentRepository.create({
      restaurant: restaurant,
      username: createCommentDto.username,
      comment: createCommentDto.comment,
    });

    await this.commentRepository.save(commentEntity);
    return commentEntity;
  }

  private async calculateRate(restaurantId): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.rates', 'rates')
      .leftJoinAndSelect('restaurant.comments', 'comments')
      .where('restaurant.id = :restaurantId', {
        restaurantId,
      })
      .getOne();

    let averageRate = 0;

    for (const rate of restaurant.rates) {
      averageRate += rate.value;
    }

    restaurant.averageRate = averageRate;
    restaurant.rateCount = restaurant.rates.length;

    return this.restaurantRepository.save(restaurant);
  }

  async rateRestaurant(
    rateRestaurantDto: RateRestaurantDto,
  ): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .where('restaurant.id = :restaurantId', {
        restaurantId: rateRestaurantDto.restaurantId,
      })
      .getOne();

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const restaurantRateEntity =
      this.restaurantRateRepository.create(rateRestaurantDto);

    await this.restaurantRateRepository.save(restaurantRateEntity);

    return this.calculateRate(rateRestaurantDto.restaurantId);
  }
}
