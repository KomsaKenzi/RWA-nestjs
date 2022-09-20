import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Battle } from 'src/entities/battle.entity';
import { Card } from 'src/entities/card.entity';
import { Deck } from 'src/entities/deck.entity';
import { Shop } from 'src/entities/shop.entity';


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'medivalstrike',
      entities: [User, Battle, Card, Deck, Shop],
      synchronize: true,
    };
  }
}
