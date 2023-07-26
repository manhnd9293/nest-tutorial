import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { hash } from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    try {
      const hashPassword = await hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashPassword,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }
    }
  }

  signin() {
    return { data: 'Sign in success' };
  }
}
