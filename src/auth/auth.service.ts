import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepositoryType } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jws-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: UsersRepositoryType,
    private jwtService: JwtService,
  ) { }


  async findUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username } })
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = this.findUserByUsername(username);

    if (user && (await bcrypt.compare(password, (await user).password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check login credentials')
  }
}
