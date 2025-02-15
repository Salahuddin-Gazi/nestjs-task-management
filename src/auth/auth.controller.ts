import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
// import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from "@nestjs/common/decorators";

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

  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto)
  }

  // test route with Guard
  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req) {
    return req.user
  }
}
