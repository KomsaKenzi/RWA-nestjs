import { User } from './user.entity';
import { Battle } from './battle.entity';
import { Reports } from '../enums/reports.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => User, (user) => user.reports)
  public user!: User;

  @ManyToOne(() => Battle, (battle) => battle.reports)
  public battle!: Battle;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public reportedOn!: Date;

  @Column({ type: 'text', default: Reports.pending })
  public status!: Reports;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public resolvedOn: Date | null;
}
