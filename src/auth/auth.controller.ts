import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from './auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';

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
  @Post('register')
  @ApiTags('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
    type: Cat,
  })
  register(@Body() payload: RegisterRequestDto) {
    console.log('AuthController -> register -> payload:', payload);
    return 12;
  }
}
