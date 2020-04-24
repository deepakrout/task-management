import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
/**
 * Task Entity 04/23/2020
 */
@Entity()
export class Task extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @Column()
    userId: number

    @ManyToOne(type => User, user => user.tasks, {eager : false})
    user: User
}