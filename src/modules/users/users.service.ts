import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { createUserDTO } from 'src/dto/createUser.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  public getUser(username: string) {
    return this.userRepository.findOneBy({ username: username });
  }

  public async createUser(user: createUserDTO) {
    const { username, password, email } = user;

    if (!username || !password || !email)
      throw new Error('Not all parameters are provided for creating an user!');

    const userCheck1: User[] = await this.userRepository.find({
      where: { email: email },
    });

    if (userCheck1.length != 0)
      throw new Error('User with set email already exists!');

    const userCheck2: User[] = await this.userRepository.find({
      where: { username: username },
    });

    if (userCheck2.length != 0)
      throw new Error('User with set username already exists!');

    const newUser: User = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  public async getProfileData(id: number) {
    const user: User = await this.userRepository.findOne({
      where: { id: id }
    });

    if (!user) return {};


    return {
      username: user.username,
      userId: user.id,
    };
  }


  public async searchUsers(name: string, userID: number) {
    const users: User[] = (await this.userRepository.find()).filter(
      (user: User) =>
        user.id != userID && user.username.toLowerCase().includes(name),
    );

    return users;
  }
}
