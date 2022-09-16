import { User } from './user.entity';
import { Card } from './card.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => User, (user) => user.decks)
  public user!: User;

  @OneToMany(() => Card, (card) => card)
  public cards!: Card[];

  @Column({ type: 'text', nullable: false })
  public name!: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdOn!: Date;
}
