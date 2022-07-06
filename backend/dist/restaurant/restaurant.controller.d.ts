import { RestaurantService } from './restaurant.service';
import { RestaurantEntity } from './restaurant.entity';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RateRestaurantDto } from './dto/rate-restaurant.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    getAll(): Promise<RestaurantEntity[]>;
    rate(rateRestaurantDto: RateRestaurantDto): Promise<RestaurantEntity>;
    getById(id: number): Promise<RestaurantEntity>;
    createComment(id: number, createCommentDto: CreateCommentDto): Promise<CommentEntity>;
}
