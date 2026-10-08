import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users: any[] = [];

  constructor(private jwtService: JwtService) {}

  async register(username: string, pass: string, role: string = 'user') {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    const newUser = {
      id: this.users.length + 1,
      username,
      password: hashedPassword,
      role,
    };
    this.users.push(newUser);


    console.log(
      '>>> [DATABASE LOCAL - USERS TABLE]:',
      JSON.stringify(this.users, null, 2),
    );

    return {
      message: 'Đăng ký thành công',
      user: { id: newUser.id, username, role },
    };
  }

  async validateUser(username: string, pass: string) {
    const user = this.users.find((u: any) => u.username === username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
