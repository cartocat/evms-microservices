import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * User TypeORM Database Object Class
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  userName: string;

  @Column('varchar', { length: 20 })
  phoneNumber: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
