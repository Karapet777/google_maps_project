import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity({ name: 'restaurant_rate' })
export class RestaurantRateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  value: number;

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
