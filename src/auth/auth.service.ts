import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (user?.password !== pass) {
      throw new UnauthorizedException('Username or password wrong!');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
