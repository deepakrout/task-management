import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';

/**
 * Auth Controller
 * Date: 04/17/2020
 */
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto){
        return this.authService.signUp(authCredentialDto);
    }

    @Post("/signin")
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken : string}>  {
        return this.authService.signIn(authCredentialDto);
    }
}
