import { Injectable, Post } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { data: 'Sign up success' };
  }

  signin() {
    return { data: 'Sign in success' };
  }
}
