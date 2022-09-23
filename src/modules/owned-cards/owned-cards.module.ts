import { Module } from '@nestjs/common';
import { OwnedCardsService } from './owned-cards.service';
import { OwnedCardsController } from './owned-cards.controller';
import { OwnedCards } from 'src/entities/ownedCards.entity';
import { User } from 'src/entities/user.entity';
import { Card } from 'src/entities/card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Deck } from 'src/entities/deck.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OwnedCards]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([Deck]),
  ],
  providers: [OwnedCardsService, UsersService],
  controllers: [OwnedCardsController]
})
export class OwnedCardsModule {}
