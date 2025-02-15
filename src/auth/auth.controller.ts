import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/signup')
  singnUp(
    @Body() authCredentialsDto: AuthCredentialsDto

  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto

  ): Promise<string> {
    return this.authService.signIn(authCredentialsDto)
  }
}
