import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  comment: string;

  @ManyToOne(
    () => RestaurantEntity,
    (restaurantEntity) => restaurantEntity.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity;
}
