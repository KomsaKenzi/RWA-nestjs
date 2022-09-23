/*import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { Card } from 'src/entities/card.entity';
import { Shop } from 'src/entities/shop.entity';
import { UsersService } from '../users/users.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { ShopService } from '../shop/shop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Shop]),
  ],
  controllers: [CardsController],
  providers: [CardsService, AuthService, JwtService, UsersService, ShopService],
  exports: [CardsService],
})
export class CardsModule {}
*/