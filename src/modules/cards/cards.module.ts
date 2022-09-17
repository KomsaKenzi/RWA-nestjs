import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { Card } from 'src/entities/card.entity';
import { UsersService } from '../users/users.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [CardsController],
  providers: [CardsService, AuthService, JwtService, UsersService],
  exports: [CardsService],
})
export class CardsModule {}
