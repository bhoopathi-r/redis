import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksController } from './tasks.controller';
import { TasksProcessor } from './tasks.processor';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'tasks',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: configService.get<string>('QUEUE_NAME', 'tasks'),
      }),
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksProcessor],
})
export class QueueModule {}
