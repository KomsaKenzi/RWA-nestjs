import { Card } from './card.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Card, (card) => card.shop)
  public card!: Card;

  @Column({ type: 'int', nullable: false })
  public price!: number;

  @Column({ type: 'text', nullable: false })
  public text!: string;

}
