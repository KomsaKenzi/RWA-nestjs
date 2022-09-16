import {
    Column,
    Entity,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Report } from './report.entity';
  import { User } from './user.entity';
  import { Deck } from './deck.entity';
  
  @Entity()
  export class Battle {
    @PrimaryGeneratedColumn()
    public id!: number;
  
    @ManyToMany(() => User)
    @JoinTable()
    users: User[]

    @Column({
      type: 'timestamptz',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    })
    public battleStarted!: Date;
  
    @Column({
      type: 'timestamptz',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    })
    public battleEnded!: Date;
  
    @OneToMany(() => Report, (report) => report.battle)
    public reports: Report[];
  
    @OneToOne(() => User, (user) => user)
    public winner: User[];

  }
  