import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { RegisterRequestDto } from './auth.dto';

@Injectable()
export class AuthService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  addUser(user: RegisterRequestDto) {
    // this.prisma.user.create
    if (this.getUserByMobile(user.mobileNumber)) {
      throw new Error(
        `user with mobileNumber ${user.mobileNumber} already exists`,
      );
    }

    // this.prisma.user.create(user);
  }

  findAllUsers() {
    return this.prisma.user.findMany();
  }

  countAllUsers() {
    return this.findAllUsers.length;
  }

  async getUserByMobile(mobileNumber: string) {
    const user = await this.prisma.user.findUnique({
      where: { mobileNumber },
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async userDoesExist(userId: number) {
    const user = await this.getUserById(userId);

    return !!user;
  }
}
