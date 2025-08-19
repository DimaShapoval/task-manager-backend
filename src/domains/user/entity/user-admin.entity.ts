import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user-admin')
export class UserAdmin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}