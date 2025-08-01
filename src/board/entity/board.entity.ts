import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../task/entity/task.entity';

@Entity('board')
export class Board {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToMany(() => Task, task => task.id)
	taskId: Task[]
}
