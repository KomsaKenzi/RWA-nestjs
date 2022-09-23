import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BuyCardDTO } from 'src/dto/buyCard.dto';
import { OwnedCards } from 'src/entities/ownedCards.entity';
import { OwnedCardsService } from './owned-cards.service';

@Controller('owned-cards')
export class OwnedCardsController {
  constructor(private ownedCardsService: OwnedCardsService) {}
  @UseGuards(JwtAuthGuard)
  @Post('buyCard')
  public buyCard(@Body() ownedCards: BuyCardDTO): Promise<OwnedCards> {
    return this.ownedCardsService.buyCard(ownedCards);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getOwnedCardsForId/:id')
  public getOwnedCardsForId(@Param('id', ParseIntPipe) id: number) {
    return this.ownedCardsService.getOwnedCardsForId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteOwnedCards/:id')
  public deleteOwnedCards(@Param('id', ParseIntPipe) id: number) {
    this.ownedCardsService.deleteOwnedCards(id);
  }
}
