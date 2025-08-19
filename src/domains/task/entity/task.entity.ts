import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ETypeOfTask } from '../interface/type.enum';
import { Board } from '../../board/entity/board.entity';

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ETypeOfTask,
        default: ETypeOfTask.task,
    })
    type: ETypeOfTask;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => Board, board => board.taskId, { onDelete: 'CASCADE' })
    boardId: Board;
}
