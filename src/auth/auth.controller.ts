import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('whoAmI')
  @ApiTags('whoAmI')
  @ApiOperation({
    tags: ['whoAmI'],
    summary: 'user data',
  })
  @ApiResponse({
    status: 403,
    description: 'UnAuthorized',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Custom header',
  })
  whoAmI(@Request() req) {
    return this.authService.getUser(req.user?.username);
  }
}
