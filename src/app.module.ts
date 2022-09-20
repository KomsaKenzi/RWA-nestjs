import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './modules/shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from 'typeOrmConfig.service';
import { SongsController } from './songs/songs.controller';
import { UsersController } from './modules/users/users.controller';
import { CardsModule } from './modules/cards/cards.module';

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
  ],
  controllers: [AppController, SongsController],
  providers: [AppService],
})
export class AppModule {}
