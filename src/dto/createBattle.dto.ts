import { User } from '../entities/user.entity';
export interface createBattleDTO {
    users: User;
    battleEnded: string;
    battleStarted: string;
  }
  