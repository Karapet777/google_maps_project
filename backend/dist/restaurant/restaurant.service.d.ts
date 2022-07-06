import { RestaurantEntity } from './restaurant.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RestaurantRateEntity } from './restaurant-rate.entity';
import { RateRestaurantDto } from './dto/rate-restaurant.dto';
export declare class RestaurantService {
    private readonly restaurantRepository;
    private readonly restaurantRateRepository;
    private readonly commentRepository;
    constructor(restaurantRepository: Repository<RestaurantEntity>, restaurantRateRepository: Repository<RestaurantRateEntity>, commentRepository: Repository<CommentEntity>);
    getAll(): Promise<RestaurantEntity[]>;
    getById(restaurantId: number): Promise<RestaurantEntity>;
    createComment(restaurantId: number, createCommentDto: CreateCommentDto): Promise<CommentEntity>;
    private calculateRate;
    rateRestaurant(rateRestaurantDto: RateRestaurantDto): Promise<RestaurantEntity>;
}
