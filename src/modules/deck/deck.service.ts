import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeckDTO } from 'src/dto/createDeck.dto';
import { Card } from 'src/entities/card.entity';
import { Deck } from 'src/entities/deck.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeckService {
    constructor(
        @InjectRepository(Card) private cardRepository: Repository<Card>,
        @InjectRepository(Deck) private deckRepository: Repository<Deck>,
        @InjectRepository(User) private userRepository: Repository<User>,
      ) {}


      public async getDecks(id: number) {
        const user: User | null = await this.userRepository.findOneBy({
            id: id,
          });

          const data = (
            await this.deckRepository.find({
                where: { user: user },
                relations:{ user:true },
                
            })
      
          ).map((deck: Deck) => {
            return {
              id: deck.id,
              userId: deck.user.id,
              name: deck.name,
              card1: deck.card1,
              card2: deck.card2,
              card3: deck.card3,
            };
          });
          return data;
      }

      public async createDeck(deckInfo: CreateDeckDTO) {
        const user: User | null = await this.userRepository.findOneBy({
          id: deckInfo.userId,
        });

        const data = {
          ...deckInfo,
          user: user,
        };
    
        const newDeck = this.deckRepository.create(data);
        return this.deckRepository.save(newDeck);
      }

      public async deleteDecks(id: number) {
        const deck = await this.deckRepository.findOneBy({ id: id });

    
        return this.deckRepository.remove(deck);
      }
}
