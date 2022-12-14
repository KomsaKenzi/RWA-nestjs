import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardsDTO } from 'src/dto/createCards.dto';
import { UpdateCardsDTO } from 'src/dto/updateCards.dto';
import { Card } from 'src/entities/card.entity';
import { User } from 'src/entities/user.entity';
import { Shop } from 'src/entities/shop.entity';
import { Repository } from 'typeorm';
import { Deck } from 'src/entities/deck.entity';
import { OwnedCards } from 'src/entities/ownedCards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
    @InjectRepository(Deck) private deckRepository: Repository<Deck>,
    @InjectRepository(OwnedCards) private ownedCardsRepository: Repository<OwnedCards>,
  ) {}

  public async getCards() {

    const data = (
      await this.cardRepository.find()

    ).map((card: Card) => {
      return {
        id: card.id,
        attack: card.attack,
        defence: card.defence,
        description: card.description,
        name: card.name,
        level: card.level,
      };
    });

  return data;
  }

  public async getCardsForId(id: number) {
    const card: Card | null = await this.cardRepository.findOne({
      where: { id: id },
    });

    const data = {
        id: card.id,
        attack: card.attack,
        defence: card.defence,
        description: card.description,
        name: card.name,
        level: card.level,
      };

    return data;
  }
  
  public async createCards(cardsInfo: CreateCardsDTO) {
    
    const data = {
      ...cardsInfo,
    };

    const newCards = this.cardRepository.create(data);
    return this.cardRepository.save(newCards);
  }

  public async updateCards(data: UpdateCardsDTO) {
    const card = await this.cardRepository.findOneBy({ id: data.id });
    card.name = data.name;
    card.defence = data.defence;
    card.attack = data.attack;
    card.id = data.id;
    card.description = data.description;

    await this.cardRepository.update(data.id, card);

    return card;
  }

  public async deleteCards(id: number) {
    const card = await this.cardRepository.findOneBy({ id: id });
    const shop = await this.shopRepository.findOneBy({ card: card });
    let deck = await this.deckRepository.findBy({ card1: card.id });
    if(deck) await this.deckRepository.remove(deck);
     deck = await this.deckRepository.findBy({ card2: card.id });
    if(deck) await this.deckRepository.remove(deck);
     deck = await this.deckRepository.findBy({ card3: card.id });
    if(deck) await this.deckRepository.remove(deck);

    let owned = await this.ownedCardsRepository.findBy({ card: card });
    if(owned) await this.ownedCardsRepository.remove(owned);
    if(shop) await this.shopRepository.remove(shop);


    return this.cardRepository.remove(card);
  }
}
