import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'int', nullable: false })
  public level!: number;

  @Column({ type: 'text', nullable: false })
  public description!: string;

}
