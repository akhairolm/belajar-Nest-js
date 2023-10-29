import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}
  @Post()
  @UseGuards(AuthGuard)
  createItem(@Body() body: createItemDto, @CurrentUser() user: User) {
    return this.itemService.create(body, user);
  }
}
