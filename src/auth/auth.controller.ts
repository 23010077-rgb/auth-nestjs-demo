import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.username, body.password, body.role);
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    return this.authService.login(user);
  }
}
