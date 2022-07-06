import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IPoint } from '../interfaces/IPoint';
import { CommentEntity } from './comment.entity';
import { RestaurantRateEntity } from './restaurant-rate.entity';

@Entity({ name: 'restaurant' })
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    default:
      'https://media-cdn.tripadvisor.com/media/photo-s/1a/24/28/75/table-for-family-dinner.jpg',
  })
  image: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: IPoint;

  @Column({ type: 'double precision', default: 0 })
  averageRate: number;

  @Column({ default: 0 })
  rateCount: number;

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.restaurant)
  comments: CommentEntity[];

  @OneToMany(
    () => RestaurantRateEntity,
    (restaurantRateEntity) => restaurantRateEntity.restaurant,
  )
  rates: RestaurantRateEntity[];
}
