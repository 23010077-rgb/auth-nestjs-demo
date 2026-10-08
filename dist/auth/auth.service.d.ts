import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private users;
    constructor(jwtService: JwtService);
    register(username: string, pass: string, role?: string): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            role: string;
        };
    }>;
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
