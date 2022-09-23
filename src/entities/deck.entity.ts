import { User } from './user.entity';
import { Card } from './card.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => User, (user) => user.decks)
  public user!: User;

  @Column({ type: 'text', nullable: false })
  public name!: string;

  @Column({ type: 'int'})
  public card1!: number;

  @Column({ type: 'int'})
  public card2!: number;

  @Column({ type: 'int'})
  public card3!: number;
}
