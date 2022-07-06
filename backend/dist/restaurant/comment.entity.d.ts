import { RestaurantEntity } from './restaurant.entity';
export declare class CommentEntity {
    id: number;
    username: string;
    comment: string;
    restaurant: RestaurantEntity;
}
