import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../task/entity/task.entity';
import { User } from '../../user/entity/user.entity';

@Entity('board')
export class Board {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToMany(() => Task, task => task.boardId)
	taskId: Task[]

	@ManyToMany(() => User, user => user.collaborations)
	@JoinTable()
	collaborators: User[];


	@ManyToOne(() => User, user => user.boards)
	@JoinColumn({ name: 'userId' })
	user: User;
}
