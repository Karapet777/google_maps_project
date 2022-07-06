import { IPoint } from '../interfaces/IPoint';
import { CommentEntity } from './comment.entity';
import { RestaurantRateEntity } from './restaurant-rate.entity';
export declare class RestaurantEntity {
    id: number;
    name: string;
    description: string;
    image: string;
    location: IPoint;
    averageRate: number;
    rateCount: number;
    comments: CommentEntity[];
    rates: RestaurantRateEntity[];
}
