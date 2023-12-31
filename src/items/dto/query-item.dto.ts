/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class QueryItemDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  category: string;
}
