import {
    Column,
    Entity,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
  } from 'typeorm';
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
      type: 'timestamp',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    })
    public battleStarted!: Date;
  
    @Column({
      type: 'timestamp',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    })
    public battleEnded!: Date;
  
  
    @OneToOne(() => User, (user) => user)
    public winner: User[];

  }
  