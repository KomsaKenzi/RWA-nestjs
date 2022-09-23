import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateDeckDTO } from 'src/dto/createDeck.dto';
import { Deck } from 'src/entities/deck.entity';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}
  @UseGuards(JwtAuthGuard)
  @Post('createDeck')
  public createDeck(@Body() deck: CreateDeckDTO): Promise<Deck> {
    return this.deckService.createDeck(deck);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getDecks/:id')
  public getDecks(@Param('id', ParseIntPipe) id: number) {
    return this.deckService.getDecks(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteDecks/:id')
  public deleteDecks(@Param('id', ParseIntPipe) id: number) {
    this.deckService.deleteDecks(id);
  }
}
