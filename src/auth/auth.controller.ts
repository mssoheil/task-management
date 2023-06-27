import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from './auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';

export class Cat {
  /**
   * The name of the Cat
   * @example Kitty
   */
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiTags('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  register(@Body() payload: RegisterRequestDto) {
    return this.authService.addUser(payload);
  }
}
