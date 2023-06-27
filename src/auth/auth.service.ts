import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'hash';
import type { RegisterRequestDto } from './auth.dto';

@Injectable()
export class AuthService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async addUser(user: RegisterRequestDto) {
    const foundUser = await this.getUserByMobile(user.mobileNumber);

    if (foundUser) {
      throw new Error(
        `user with mobileNumber ${user.mobileNumber} already exists`,
      );
    }

    const hashedPassword = hashPassword(user.password);
    const newData = {
      ...user,
      password: hashedPassword,
    };

    await this.prisma.user.create({
      data: newData,
    });

    return 'user created';
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
