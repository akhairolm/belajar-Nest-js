/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { createItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ItemDto } from './dto/item.dto';
import { ApprovedItemDto } from './dto/approve-item.dto';
import { AdminGuard } from '../guards/admin.guard';
import { QueryItemDto } from './dto/query-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}
  @Get()
  getAllItems(@Query() query: QueryItemDto) {
    return this.itemService.getAllItems(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ItemDto)
  createItem(@Body() body: createItemDto, @CurrentUser() user: User) {
    return this.itemService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveItem(@Param('id') id: string, @Body() body: ApprovedItemDto) {
    return this.itemService.approveItem(parseInt(id), body.approved);
  }
}
