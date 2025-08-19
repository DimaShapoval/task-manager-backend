import { Board } from '../domains/board/entity/board.entity';
export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  isEmailConfirmed?: boolean;
  photo?: string;
}