import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            role: string;
        };
    }>;
    login(body: any): Promise<{
        access_token: string;
    }>;
}
