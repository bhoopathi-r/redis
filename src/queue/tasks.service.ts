import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TasksService {
  constructor(@InjectQueue('tasks') private readonly tasksQueue: Queue) {}

  async enqueueTask(payload: Record<string, unknown>): Promise<{ jobId: string | number }> {
    const job = await this.tasksQueue.add('process-task', payload, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
    });

    return { jobId: job.id };
  }
}
