import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from 'src/helpers/hash';
import type { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly prisma: PrismaClient;

  constructor(private readonly jwtService: JwtService) {
    this.prisma = new PrismaClient();
  }

  async addUser(user: RegisterRequestDto) {
    const foundUser = await this.getUserByMobile(user.mobileNumber);

    if (foundUser) {
      throw new Error(
        `user with mobileNumber ${user.mobileNumber} already exists`,
      );
    }

    const hashedPassword = await hashPassword(user.password);
    const newData = {
      ...user,
      password: hashedPassword,
    };

    await this.prisma.user.create({
      data: newData,
    });

    return 'user created';
  }

  async loginUser(payload: LoginRequestDto) {
    const foundUser = await this.getUserByUserName(payload.username);
    console.log('AuthService -> loginUser -> foundUser:', foundUser);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    const samePassword = await comparePassword(
      payload.password,
      foundUser.password,
    );

    if (!samePassword) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: foundUser.id,
        username: foundUser.username,
      }),
    };
  }

  findAllUsers() {
    return this.prisma.user.findMany();
  }

  countAllUsers() {
    return this.findAllUsers.length;
  }

  async getUserByUserName(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
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
