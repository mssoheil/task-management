import { Module } from '@nestjs/common';
import { TaskController } from './task.contoller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
