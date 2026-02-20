import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { KeyValueDto } from '../common/dto/key-value.dto';
import { RedisCacheService } from './redis-cache.service';

@Controller('cache')
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  @Post()
  async set(@Body() body: KeyValueDto): Promise<{ message: string }> {
    await this.redisCacheService.set(body.key, body.value, body.ttlSeconds);
    return { message: `Cached key "${body.key}"` };
  }

  @Get(':key')
  async get(@Param('key') key: string): Promise<{ key: string; value: string | null }> {
    const value = await this.redisCacheService.get(key);
    return { key, value };
  }

  @Delete(':key')
  async delete(@Param('key') key: string): Promise<{ message: string }> {
    await this.redisCacheService.delete(key);
    return { message: `Deleted key "${key}"` };
  }
}
