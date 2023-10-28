import { Body, Controller, Post } from '@nestjs/common';
import { createItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}
  @Post()
  createItem(@Body() body: createItemDto) {
    return this.itemService.create(body);
  }
}
