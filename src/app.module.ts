import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './modules/shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from 'typeOrmConfig.service';
import { UsersController } from './modules/users/users.controller';
import { CardsModule } from './modules/cards/cards.module';
import { OwnedCardsModule } from './modules/owned-cards/owned-cards.module';
import { DeckModule } from './modules/deck/deck.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    AuthModule,
    ShopModule,
    CardsModule,
    OwnedCardsModule,
    DeckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
