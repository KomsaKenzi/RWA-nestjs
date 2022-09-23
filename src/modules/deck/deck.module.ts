import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';
import { UsersService } from '../users/users.service';
import { Deck } from 'src/entities/deck.entity';
import { User } from 'src/entities/user.entity';
import { Card } from 'src/entities/card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deck]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Card]),
  ],
  providers: [DeckService, UsersService],
  controllers: [DeckController]
})
export class DeckModule {}
