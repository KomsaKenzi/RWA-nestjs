import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Card } from 'src/entities/card.entity';
import { UsersService } from '../users/users.service';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Card]),
  ],
  controllers: [ShopController],
  providers: [ShopService, AuthService, JwtService, UsersService],
  exports: [ShopService],
})
export class ShopModule {}
