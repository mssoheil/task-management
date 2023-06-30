import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskRequestDto } from './task.dto';

@Injectable()
export class TaskService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllTasks() {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  async getTask(taskId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return new NotFoundException();
    }

    return task;
  }

  async addTask(task: CreateTaskRequestDto) {
    await this.prisma.task.create({
      data: task,
    });
    return 'task created';
  }
}
