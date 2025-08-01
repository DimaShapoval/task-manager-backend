import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../../board/entity/board.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photo?: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @OneToMany(() => Board, board => board.user)
  boards: Board[];

  @ManyToMany(() => Board, board => board.collaborators)
  collaborations: Board[];
}
