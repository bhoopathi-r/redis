import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('tasks')
export class TasksProcessor {
  private readonly logger = new Logger(TasksProcessor.name);

  @Process('process-task')
  async handleTask(job: Job<Record<string, unknown>>): Promise<void> {
    this.logger.log(`Processing job ${job.id} with payload: ${JSON.stringify(job.data)}`);
    // Place your business logic here.
  }
}
