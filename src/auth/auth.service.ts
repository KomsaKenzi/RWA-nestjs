import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user: User = await this.usersService.getUser(username);

    if (user && user.password == password) return user;
    else return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      id: user.id,
      profiles: user.profiles,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET,
      }),
      username: user.username,
      profiles: user.profiles,
      id: user.id,
    };
  }
}
