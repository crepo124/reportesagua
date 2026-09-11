import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  async login(dto: LoginDto): Promise<User> {
    const user = await this.usersService.validateCredentials(dto.email, dto.password);
    if (!user) {
      throw new BadRequestException('El email o la contraseña no es valido');
    }
    return user;
  }
}