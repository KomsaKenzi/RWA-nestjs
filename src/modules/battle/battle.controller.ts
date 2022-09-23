/*import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import { CreateCardsDTO } from 'src/dto/createCards.dto';
  import { UpdateCardsDTO } from 'src/dto/updateCards.dto';
  import { Card } from 'src/entities/card.entity';
  import { CardsService } from './cards.service';
  
  @Controller('cards')
  export class CardsController {
    constructor(private cardsService: CardsService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get('getCards')
    public getCards() {
      return this.cardsService.getCards();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('getCardsForId/:id')
    public getCardsForId(@Param('id', ParseIntPipe) id: number) {
      return this.cardsService.getCardsForId(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post('createCards')
    public createCards(@Body() card: CreateCardsDTO): Promise<Card> {
      return this.cardsService.createCards(card);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put('updateCards')
    public updateCards(@Body() data: UpdateCardsDTO) {
      return this.cardsService.updateCards(data);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete('deleteCards/:id')
    public deleteCards(@Param('id', ParseIntPipe) id: number) {
      this.cardsService.deleteCards(id);
    }
  }
*/  