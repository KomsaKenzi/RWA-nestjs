import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';
import { User } from './user.entity';

@Entity()
export class OwnedCards {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Card, (card) => card.id)
  public card!: Card;

  @ManyToOne(() => User, (user) => user.id)
  public user!: User;
}
