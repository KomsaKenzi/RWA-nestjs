import {
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
import { AddToShopDTO } from 'src/dto/addToShop.dto';
import { UpdateShopDTO } from 'src/dto/updateShop.dto';
import { ShopService } from './shop.service';
import { Shop } from 'src/entities/shop.entity';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('getShops')
  public getShops() {
    return this.shopService.getShops();
  }

  @Post('addToShop')
  public addToShop(@Body() shop: AddToShopDTO): Promise<Shop> {
    return this.shopService.addToShop(shop);
  }

  @Put('updateShop')
  public updateShop(@Body() shop: UpdateShopDTO) {
    return this.shopService.updateShop(shop);
  }

  @Delete('deleteShop/:id')
  public deleteShop(@Param('id', ParseIntPipe) id: number) {
    this.shopService.deleteShop(id);
  }
  
}
