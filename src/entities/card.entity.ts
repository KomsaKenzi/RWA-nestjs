import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';
import { Deck } from './deck.entity';
import { OwnedCards } from './ownedCards.entity';


@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text', nullable: false })
  public name!: string;

  @Column({ type: 'int', nullable: false })
  public attack!: number;
  
  @Column({ type: 'int', nullable: false })
  public defence!: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  public level!: number;

  @Column({ type: 'text', nullable: false })
  public description!: string;

  @OneToMany(() => Shop, (shop) => shop.card)
  public shop!: Shop;

  @OneToMany(() => OwnedCards, (ownedCards) => ownedCards.card)
  public ownedCards!: OwnedCards;
}
