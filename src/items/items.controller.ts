import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}
  @Post()
  @UseGuards(AuthGuard)
  createItem(@Body() body: createItemDto) {
    return this.itemService.create(body);
  }
}
