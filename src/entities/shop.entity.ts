import { Card } from './card.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToMany(() => Card, (card) => card)
  public card!: Card[];

  @Column({ type: 'int', nullable: false })
  public price!: number;

}
