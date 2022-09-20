import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddToShopDTO } from 'src/dto/addToShop.dto';
import { UpdateShopDTO } from 'src/dto/updateShop.dto';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Card } from 'src/entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  public async getShops() {
    

    const data = (
      await this.shopRepository.find(
        {
          relations:{card:true}
        }
      )
    ).map((shop: Shop) => {

      return {
        id: shop.id,
        price: shop.price,
        text: shop.text,
        card: shop.card,
      };
    });
    
  return data;
  }

  public async addToShop(shopInfo: AddToShopDTO) {

    const card: Card | null = await this.cardRepository.findOneBy({
      id: shopInfo.cardId,
    });

    if (!card) throw new Error('Card not found while creating an shop item!');

    const data = {
      ...shopInfo,
        card:card,
    };
    const newShop = this.shopRepository.create(data);
    return this.shopRepository.save(newShop);
  }

  public async updateShop(shopInfo: UpdateShopDTO) {

    const shop: Shop | null = await this.shopRepository.findOneBy({
      id: shopInfo.id,
    });

    if (!shop) throw new Error('Card not found in shop!');

    const data = {
      ...shopInfo,
    };

    return this.shopRepository.update(data.id, data);
  }

  public async deleteShop(id: number) {
    const shop = await this.shopRepository.findOneBy({ id: id });

    return this.shopRepository.remove(shop);

  }

}
