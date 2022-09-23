import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyCardDTO } from 'src/dto/buyCard.dto';
import { Card } from 'src/entities/card.entity';
import { Deck } from 'src/entities/deck.entity';
import { OwnedCards } from 'src/entities/ownedCards.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class OwnedCardsService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Card) private cardRepository: Repository<Card>,
        @InjectRepository(OwnedCards) private ownedCardsRepository: Repository<OwnedCards>,
        @InjectRepository(Deck) private deckRepository: Repository<Deck>,
      ) {}

    public async buyCard(buyInfo: BuyCardDTO) {

        const card: Card | null = await this.cardRepository.findOneBy({
          id: buyInfo.cardId,
        });
    
        const user: User | null = await this.userRepository.findOneBy({
          id: buyInfo.userId,
        });
    
        if (!card) throw new Error('Card not found while creating an shop item!');
        if (!user) throw new Error('User not found while creating an shop item!');
    
        const data = {
          ...buyInfo,
            card:card,
            user:user,
        };
        const newBuy = this.ownedCardsRepository.create(data);
        return this.ownedCardsRepository.save(newBuy);
      }

      public async getOwnedCardsForId(id: number) {
        const user: User | null = await this.userRepository.findOneBy({
            id: id,
          });
    
          const data = (
            await this.ownedCardsRepository.find({
                where: { user: user },
                relations:{card:true, user:true},
                
            })
      
          ).map((ownedCards: OwnedCards) => {
            return {
              id: ownedCards.id,
              card: ownedCards.card,
            };
          });
      
        return data;
      }

      public async deleteOwnedCards(id: number) {
        const owned = await this.ownedCardsRepository.findOneBy({ id: id });
        let deck = await this.deckRepository.findBy({ card1: owned.id });
        if(deck) await this.deckRepository.remove(deck);
         deck = await this.deckRepository.findBy({ card2: owned.id });
        if(deck) await this.deckRepository.remove(deck);
         deck = await this.deckRepository.findBy({ card3: owned.id });
        if(deck) await this.deckRepository.remove(deck);

        return this.ownedCardsRepository.remove(owned);
      }
      
}
