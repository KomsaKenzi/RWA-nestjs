import { profiles } from 'src/enums/profiles.enum';

export interface createUserDTO {
  email: string;
  password: string;
  username: string;
  profiles?: profiles;
  balance?: number;
}
