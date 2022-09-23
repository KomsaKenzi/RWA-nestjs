import { profiles } from '../enums/profiles.enum';
import { Deck } from './deck.entity';
import { Battle } from './battle.entity';
import { OwnedCards } from './ownedCards.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text', nullable: false, unique: true })
  public username!: string;

  @Column({ type: 'text', nullable: false, unique: true })
  public email!: string;

  @Column({ type: 'text', nullable: false })
  public password!: string;

  @Column({ type: 'text', nullable: false, default: profiles.user })
  public profiles!: string;

  @Column({ type: 'int', nullable: false, default: 1000 })
  public balance!: number;

  @OneToMany(() => Deck, (deck) => deck.user)
  public decks: Deck[];

  @OneToMany(() => Battle, (battle) => battle.users)
  public battles: Battle[];

  @OneToMany(() => OwnedCards, (ownedCards) => ownedCards.user)
  public ownedCards!: OwnedCards;
}
