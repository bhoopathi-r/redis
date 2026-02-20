import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('queue')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('tasks')
  async enqueue(
    @Body() payload: Record<string, unknown>,
  ): Promise<{ message: string; jobId: string | number }> {
    const result = await this.tasksService.enqueueTask(payload);

    return {
      message: 'Task enqueued successfully',
      jobId: result.jobId,
    };
  }
}
