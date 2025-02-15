import { Inject, Injectable } from "@nestjs/common/decorators/core";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepositoryType } from "./users.repository"
import { JwtPayload } from "./jws-payload.interface";
import { User } from "./user.entity";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: UsersRepositoryType
  ) {
    super({
      secretOrKey: "topSecretGG",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  // ✅ Implement the validate method
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException()
    }

    return user; // Returning the user object will attach it to the request
  }
}