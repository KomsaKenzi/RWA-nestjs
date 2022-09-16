import { profiles } from '../enums/profiles.enum';
import { Report } from './report.entity';
import { Deck } from './deck.entity';
import { Battle } from './battle.entity';
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
  public profileType!: string;

  @Column({ type: 'int', nullable: false, default: 1000 })
  public balance!: number;

  @OneToMany(() => Deck, (deck) => deck.user)
  public decks: Deck[];

  @OneToMany(() => Report, (report) => report.user)
  public reports: Report[];

  @OneToMany(() => Battle, (battle) => battle.users)
  public battles: Battle[];
}
