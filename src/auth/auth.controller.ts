import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiTags('register')
  @ApiOperation({ summary: 'Register user' })
  register(@Body() payload: RegisterRequestDto) {
    return this.authService.addUser(payload);
  }

  @Post('login')
  @ApiTags('login')
  @ApiOperation({
    tags: ['login'],
    summary: 'login user',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  login(@Body() payload: LoginRequestDto) {
    return this.authService.loginUser(payload);
  }
}
